import { UserService } from "../../src/services/UserService";
import { UserModel } from "../../src/models/UserModel";
import { AppError } from "../../src/errors/AppError";
import { STATUS_CODE } from "../../src/constants/statusCode";
import bcrypt from "bcrypt";

jest.mock("../../src/models/UserModel");
jest.mock("bcrypt");

describe("UserService", () => {
  let userService: UserService;
  let mockUserModel: jest.Mocked<UserModel>;
  let bcryptMock: jest.Mocked<typeof bcrypt>;

  beforeEach(() => {
    mockUserModel = new UserModel() as jest.Mocked<UserModel>;
    userService = new UserService();
    (userService as any).userModel = mockUserModel;
    bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;
    jest.clearAllMocks();
  });

  const mockUser = {
    idUser: "user-id",
    username: "testuser",
    email: "test@example.com",
    password: "hashedpassword",
    role: "admin" as const,
    idBrandMaster: null,
    isActive: true,
    lastLoginDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    profileImgUrl: null,
    brandMaster: null
  };

  const mockRequestingUser = {
    ...mockUser,
    idUser: "requesting-user-id",
    role: "admin" as const
  };

  describe("getById", () => {
    it("should return user data without password", async () => {
      mockUserModel.getById.mockResolvedValue(mockUser);

      const result = await userService.getById("user-id", mockRequestingUser);

      expect(result).not.toHaveProperty("password");
      expect(result.username).toBe("testuser");
      expect(mockUserModel.getById).toHaveBeenCalledWith("user-id");
    });

    it("should throw error when user not found", async () => {
      mockUserModel.getById.mockResolvedValue(null);

      await expect(
        userService.getById("nonexistent", mockRequestingUser)
      ).rejects.toThrow(AppError);
    });

    it("should throw unauthorized error when member tries to access other user", async () => {
      const memberUser = { ...mockRequestingUser, role: "member" as const };

      await expect(
        userService.getById("different-user-id", memberUser)
      ).rejects.toThrow(AppError);
    });

    it("should allow user to access their own data", async () => {
      mockUserModel.getById.mockResolvedValue(mockUser);

      const result = await userService.getById("user-id", {
        ...mockRequestingUser,
        idUser: "user-id",
        role: "member" as const
      });

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty("password");
    });
  });

  describe("listAll", () => {
    it("should return users list without passwords for admin", async () => {
      const mockUsers = [
        { ...mockUser, password: "hash1" },
        { ...mockUser, idUser: "user-2", password: "hash2" }
      ];

      mockUserModel.listAll.mockResolvedValue({
        totalCount: 2,
        result: mockUsers
      });

      const result = await userService.listAll({}, mockRequestingUser);

      expect(result.result).toHaveLength(2);
      result.result.forEach(user => {
        expect(user).not.toHaveProperty("password");
      });
    });

    it("should throw unauthorized error for member role", async () => {
      const memberUser = { ...mockRequestingUser, role: "member" as const };

      await expect(
        userService.listAll({}, memberUser)
      ).rejects.toThrow(AppError);
    });

    it("should allow manager to list users", async () => {
      const managerUser = { ...mockRequestingUser, role: "manager" as const };
      mockUserModel.listAll.mockResolvedValue({ totalCount: 0, result: [] });

      const result = await userService.listAll({}, managerUser);

      expect(result).toBeDefined();
      expect(mockUserModel.listAll).toHaveBeenCalled();
    });
  });

  describe("createUser", () => {
    const newUserData = {
      username: "newuser",
      email: "newuser@test.com",
      password: "plainpassword",
      role: "member" as const
    };

    it("should create user with hashed password", async () => {
      mockUserModel.emailExists.mockResolvedValue(false);
      bcryptMock.hash.mockResolvedValue("hashedpassword" as never);
      mockUserModel.createUser.mockResolvedValue({
        ...mockUser,
        ...newUserData,
        password: "hashedpassword"
      });

      const result = await userService.createUser(newUserData, mockRequestingUser);

      expect(bcryptMock.hash).toHaveBeenCalledWith("plainpassword", 10);
      expect(mockUserModel.createUser).toHaveBeenCalledWith({
        ...newUserData,
        password: "hashedpassword",
        isActive: true
      });
      expect(result).not.toHaveProperty("password");
    });

    it("should throw error when email already exists", async () => {
      mockUserModel.emailExists.mockResolvedValue(true);

      await expect(
        userService.createUser(newUserData, mockRequestingUser)
      ).rejects.toThrow(AppError);
    });

    it("should throw unauthorized error for member role", async () => {
      const memberUser = { ...mockRequestingUser, role: "member" as const };

      await expect(
        userService.createUser(newUserData, memberUser)
      ).rejects.toThrow(AppError);
    });

    it("should throw error when non-admin tries to create admin", async () => {
      const managerUser = { ...mockRequestingUser, role: "manager" as const };
      const adminUserData = { ...newUserData, role: "admin" as const };

      await expect(
        userService.createUser(adminUserData, managerUser)
      ).rejects.toThrow(AppError);
    });
  });

  describe("updateUser", () => {
    const updateData = {
      username: "updateduser",
      email: "updated@test.com"
    };

    it("should update user successfully", async () => {
      mockUserModel.getById.mockResolvedValue(mockUser);
      mockUserModel.emailExists.mockResolvedValue(false);
      mockUserModel.updateUser.mockResolvedValue({
        ...mockUser,
        ...updateData
      });

      const result = await userService.updateUser("user-id", updateData, mockRequestingUser);

      expect(result).not.toHaveProperty("password");
      expect(result.username).toBe("updateduser");
    });

    it("should throw error when user not found", async () => {
      mockUserModel.getById.mockResolvedValue(null);

      await expect(
        userService.updateUser("nonexistent", updateData, mockRequestingUser)
      ).rejects.toThrow(AppError);
    });

    it("should hash password when updating", async () => {
      const updateWithPassword = { ...updateData, password: "newpassword" };
      
      mockUserModel.getById.mockResolvedValue(mockUser);
      mockUserModel.emailExists.mockResolvedValue(false);
      bcryptMock.hash.mockResolvedValue("newhashedpassword" as never);
      mockUserModel.updateUser.mockResolvedValue(mockUser);

      await userService.updateUser("user-id", updateWithPassword, mockRequestingUser);

      expect(bcryptMock.hash).toHaveBeenCalledWith("newpassword", 10);
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully for admin", async () => {
      mockUserModel.getById.mockResolvedValue(mockUser);
      mockUserModel.deleteUser.mockResolvedValue(mockUser);

      const result = await userService.deleteUser("user-id", mockRequestingUser);

      expect(result.message).toBe("Usuário removido com sucesso");
      expect(mockUserModel.deleteUser).toHaveBeenCalledWith("user-id");
    });

    it("should throw unauthorized error for non-admin", async () => {
      const memberUser = { ...mockRequestingUser, role: "member" as const };

      await expect(
        userService.deleteUser("user-id", memberUser)
      ).rejects.toThrow(AppError);
    });

    it("should throw error when trying to delete own account", async () => {
      await expect(
        userService.deleteUser(mockRequestingUser.idUser, mockRequestingUser)
      ).rejects.toThrow(AppError);
    });
  });

  describe("verifyCredentials", () => {
    it("should return user data when credentials are valid", async () => {
      mockUserModel.getByEmail.mockResolvedValue(mockUser);
      bcryptMock.compare.mockResolvedValue(true as never);
      mockUserModel.updateLastLogin.mockResolvedValue(mockUser);

      const result = await userService.verifyCredentials("test@example.com", "password");

      expect(result).not.toHaveProperty("password");
      expect(bcryptMock.compare).toHaveBeenCalledWith("password", "hashedpassword");
      expect(mockUserModel.updateLastLogin).toHaveBeenCalledWith("user-id");
    });

    it("should throw error when user not found", async () => {
      mockUserModel.getByEmail.mockResolvedValue(null);

      await expect(
        userService.verifyCredentials("nonexistent@test.com", "password")
      ).rejects.toThrow(AppError);
    });

    it("should throw error when password is incorrect", async () => {
      mockUserModel.getByEmail.mockResolvedValue(mockUser);
      bcryptMock.compare.mockResolvedValue(false as never);

      await expect(
        userService.verifyCredentials("test@example.com", "wrongpassword")
      ).rejects.toThrow(AppError);
    });
  });
});