import { user } from "@prisma/client";
import { UserModel } from "../models/UserModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import {
  createUserSchema,
  updateUserSchema,
} from "../types/validations/User/userValidation";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcrypt";

export class UserService {
  private userModel = new UserModel();
  private saltRounds = 10;

  async getById(idUser: string, requestingUser: user) {
    if (requestingUser.idUser !== idUser && requestingUser.role === "member") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const user = await this.userModel.getById(idUser);
    if (!user) {
      throw new AppError("Usuário não encontrado", STATUS_CODE.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getByEmail(email: string) {
    return await this.userModel.getByEmail(email);
  }

  async listAll(query: unknown, requestingUser: user) {
    if (requestingUser.role === "member") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const validQuery = querySchema.parse(query);
    const result = await this.userModel.listAll(validQuery);
    const usersWithoutPassword = result.result.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return {
      ...result,
      result: usersWithoutPassword,
    };
  }

  async createUser(data: unknown, requestingUser: user) {
    if (requestingUser.role === "member") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const validData = createUserSchema.parse(data);
    const emailExists = await this.userModel.emailExists(validData.email);
    if (emailExists) {
      throw new AppError(
        "Email já está em uso por outro usuário",
        STATUS_CODE.CONFLICT,
      );
    }
    if (validData.role === "admin" && requestingUser.role !== "admin") {
      throw new AppError(
        "Apenas administradores podem criar outros administradores",
        STATUS_CODE.UNAUTHORIZED,
      );
    }
    if (
      requestingUser.idBrandMaster &&
      validData.idBrandMaster !== requestingUser.idBrandMaster
    ) {
      throw new AppError(
        "Você não pode criar usuários para outras empresas",
        STATUS_CODE.UNAUTHORIZED,
      );
    }
    const hashedPassword = await bcrypt.hash(
      validData.password,
      this.saltRounds,
    );
    const newUser = await this.userModel.createUser({
      ...validData,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(idUser: string, data: unknown, requestingUser: user) {
    const existingUser = await this.userModel.getById(idUser);
    if (!existingUser) {
      throw new AppError("Usuário não encontrado", STATUS_CODE.NOT_FOUND);
    }
    const canEdit =
      requestingUser.idUser === idUser ||
      requestingUser.role === "admin" ||
      (requestingUser.role === "manager" && existingUser.role !== "admin");
    if (!canEdit) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const validData = updateUserSchema.parse(data);
    if (validData.email) {
      const emailExists = await this.userModel.emailExists(
        validData.email,
        idUser,
      );
      if (emailExists) {
        throw new AppError(
          "Email já está em uso por outro usuário",
          STATUS_CODE.CONFLICT,
        );
      }
    }
    if (validData.role && requestingUser.role !== "admin") {
      throw new AppError(
        "Apenas administradores podem alterar funções de usuário",
        STATUS_CODE.UNAUTHORIZED,
      );
    }
    if (
      validData.role &&
      requestingUser.idUser === idUser &&
      validData.role !== "admin"
    ) {
      throw new AppError(
        "Você não pode remover sua própria função de administrador",
        STATUS_CODE.UNAUTHORIZED,
      );
    }
    if (validData.password) {
      validData.password = await bcrypt.hash(
        validData.password,
        this.saltRounds,
      );
    }
    const updatedUser = await this.userModel.updateUser(idUser, validData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(idUser: string, requestingUser: user) {
    if (requestingUser.role !== "admin") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const existingUser = await this.userModel.getById(idUser);
    if (!existingUser) {
      throw new AppError("Usuário não encontrado", STATUS_CODE.NOT_FOUND);
    }
    if (requestingUser.idUser === idUser) {
      throw new AppError(
        "Você não pode deletar sua própria conta",
        STATUS_CODE.BAD_REQUEST,
      );
    }
    const deletedUser = await this.userModel.deleteUser(idUser);
    return {
      message: "Usuário removido com sucesso",
      user: {
        idUser: deletedUser.idUser,
        username: deletedUser.username,
        email: deletedUser.email,
      },
    };
  }

  async verifyCredentials(email: string, password: string) {
    const user = await this.userModel.getByEmail(email);
    if (!user) {
      throw new AppError("Credenciais inválidas", STATUS_CODE.UNAUTHORIZED);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas", STATUS_CODE.UNAUTHORIZED);
    }
    await this.userModel.updateLastLogin(user.idUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
