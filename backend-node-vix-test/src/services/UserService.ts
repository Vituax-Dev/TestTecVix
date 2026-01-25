import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { genToken } from "../utils/jwt";
import { loginUserSchema } from "../types/validations/User/loginUser";
import {
  userCreatedSchema,
  userCreatedByManagerSchema,
} from "../types/validations/User/createUser";
import { prisma } from "../database/client";
import { BucketLocalService } from "./BucketLocalService";

export interface ILoggedUser {
  idUser: string;
  email: string;
  role: string;
  idBrandMaster: number | null;
}

export class UserService {
  private userModel = new UserModel();

  async refreshToken(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (!user.isActive) {
      throw new AppError(ERROR_MESSAGE.USER_INACTIVE, STATUS_CODE.UNAUTHORIZED);
    }

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return { token };
  }

  async login(data: unknown) {
    const { email, password } = loginUserSchema.parse(data);

    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    if (!user.isActive) {
      throw new AppError(ERROR_MESSAGE.USER_INACTIVE, STATUS_CODE.UNAUTHORIZED);
    }

    await this.userModel.update(user.idUser, { lastLoginDate: new Date() });

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        profileImgUrl: user.profileImgUrl,
        idBrandMaster: user.idBrandMaster,
      },
    };
  }

  async register(data: unknown) {
    const validData = userCreatedSchema.parse(data);

    const existingUser = await this.userModel.findByEmail(validData.email);
    if (existingUser) {
      throw new AppError(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const user = await this.userModel.create({
      ...validData,
      password: hashedPassword,
      role: "member",
      isActive: true,
    });

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImgUrl: user.profileImgUrl,
        idBrandMaster: user.idBrandMaster,
      },
    };
  }

  async createByManager(data: unknown, loggedUser: ILoggedUser) {
    const validData = userCreatedByManagerSchema.parse(data);

    // Check if email already exists
    const existingUser = await this.userModel.findByEmail(validData.email);
    if (existingUser) {
      throw new AppError(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    // Business rule: Only Vituax users (idBrandMaster: null) can create Vituax users
    const isLoggedUserVituax = loggedUser.idBrandMaster === null;
    const isCreatingVituaxUser =
      validData.idBrandMaster === null || validData.idBrandMaster === undefined;

    if (isCreatingVituaxUser && !isLoggedUserVituax) {
      throw new AppError(
        "Only Vituax users can create Vituax users",
        STATUS_CODE.FORBIDDEN,
      );
    }

    // Business rule: MSP users can only create users in their own company
    if (!isLoggedUserVituax && validData.idBrandMaster !== loggedUser.idBrandMaster) {
      throw new AppError(
        "You can only create users in your own company",
        STATUS_CODE.FORBIDDEN,
      );
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const user = await this.userModel.create({
      username: validData.username,
      email: validData.email,
      password: hashedPassword,
      phone: validData.phone,
      profileImgUrl: validData.profileImgUrl,
      role: validData.role || "member",
      isActive: validData.isActive ?? true,
      fullName: validData.fullName,
      position: validData.position,
      department: validData.department,
      hiringDate: validData.hiringDate,
      ...(validData.idBrandMaster && {
        brandMaster: { connect: { idBrandMaster: validData.idBrandMaster } },
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getById(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async listAll(query: unknown) {
    return this.userModel.listAll(
      query as { page?: number; limit?: number; search?: string },
    );
  }

  async update(idUser: string, data: unknown) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updateData = data as { password?: string; hiringDate?: string | Date; role?: "admin" | "manager" | "member"; idBrandMaster?: number | null; [key: string]: unknown };
    
    // Hash password if provided
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Convert hiringDate string to Date object if provided
    if (updateData.hiringDate && typeof updateData.hiringDate === "string") {
      updateData.hiringDate = new Date(updateData.hiringDate);
    }

    // Check if trying to demote the last admin
    if (user.role === "admin" && updateData.role && updateData.role !== "admin") {
      const adminCount = await this.userModel.countAdminsByBrandMaster(user.idBrandMaster);
      if (adminCount <= 1) {
        throw new AppError(
          ERROR_MESSAGE.CANNOT_DEMOTE_LAST_ADMIN,
          STATUS_CODE.BAD_REQUEST,
        );
      }
    }

    // Always remove idBrandMaster from update - company cannot be changed after registration
    // This ensures the field is never sent to Prisma, so it won't overwrite the existing value
    delete updateData.idBrandMaster;

    return this.userModel.update(idUser, updateData);
  }

  async delete(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Check if user is an admin
    if (user.role === "admin") {
      // Count admins in the same company (idBrandMaster)
      const adminCount = await this.userModel.countAdminsByBrandMaster(user.idBrandMaster);
      
      // If this is the last admin, prevent deletion
      if (adminCount <= 1) {
        throw new AppError(
          ERROR_MESSAGE.CANNOT_DELETE_LAST_ADMIN,
          STATUS_CODE.BAD_REQUEST,
        );
      }
    }

    return this.userModel.hardDelete(idUser);
  }

  async deactivate(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    return this.userModel.update(idUser, { isActive: false });
  }

  async reactivate(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    return this.userModel.update(idUser, { isActive: true });
  }

  /**
   * Updates user profile and company settings in a single transaction.
   * If any part fails, all changes are rolled back.
   */
  async updateProfileSettings(
    idUser: string,
    data: {
      // User fields
      username?: string;
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      profileImgUrl?: string;
      removeProfileImg?: boolean;
      // Company fields (only for admin/manager)
      companyData?: {
        emailContact?: string;
        smsContact?: string;
        timezone?: string;
      };
    }
  ) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Check if user can edit company data
    const canEditCompany =
      (user.role === "admin" || user.role === "manager") &&
      user.idBrandMaster !== null;

    // Prepare user update data
    const userUpdateData: {
      username?: string;
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      profileImgUrl?: string | null;
      updatedAt: Date;
    } = { updatedAt: new Date() };

    if (data.username) userUpdateData.username = data.username;
    if (data.fullName) userUpdateData.fullName = data.fullName;
    if (data.email) userUpdateData.email = data.email;
    if (data.phone) userUpdateData.phone = data.phone;
    
    // Handle profile image: update, remove, or keep
    const oldProfileImg = user.profileImgUrl;
    if (data.removeProfileImg) {
      // User wants to remove profile image
      userUpdateData.profileImgUrl = null;
    } else if (data.profileImgUrl) {
      // User wants to update profile image
      userUpdateData.profileImgUrl = data.profileImgUrl;
    }

    if (data.password) {
      userUpdateData.password = await bcrypt.hash(data.password, 10);
    }

    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Update user
      const updatedUser = await tx.user.update({
        where: { idUser },
        data: userUpdateData,
      });

      let updatedBrandMaster = null;

      // Update company if allowed and data provided
      if (canEditCompany && data.companyData && user.idBrandMaster) {
        const brandUpdateData: {
          emailContact?: string;
          smsContact?: string;
          timezone?: string;
          updatedAt: Date;
        } = { updatedAt: new Date() };

        if (data.companyData.emailContact !== undefined) {
          brandUpdateData.emailContact = data.companyData.emailContact;
        }
        if (data.companyData.smsContact !== undefined) {
          brandUpdateData.smsContact = data.companyData.smsContact;
        }
        if (data.companyData.timezone !== undefined) {
          brandUpdateData.timezone = data.companyData.timezone;
        }

        updatedBrandMaster = await tx.brandMaster.update({
          where: { idBrandMaster: user.idBrandMaster },
          data: brandUpdateData,
        });
      }

      return { user: updatedUser, brandMaster: updatedBrandMaster };
    });

    // Delete old profile image file after successful transaction
    // Only delete if image was changed or removed
    if (oldProfileImg && (data.profileImgUrl || data.removeProfileImg)) {
      const bucketService = new BucketLocalService();
      await bucketService.deleteFile(oldProfileImg);
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = result.user;

    return {
      user: userWithoutPassword,
      brandMaster: result.brandMaster,
    };
  }
}
