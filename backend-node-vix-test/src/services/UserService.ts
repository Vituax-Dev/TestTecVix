import { UserModel } from "../models/UserModel";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";
import { TLoginUser } from "../types/validations/User/loginUser";
import { querySchema } from "../types/validations/Queries/queryListAll";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/jwt";

export interface TUpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}

export class UserService {
  private userModel = new UserModel();

  async getById(idUser: string) {
    const user = await this.userModel.getById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    return user;
  }

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.userModel.listAll(validQuery);
  }

  async register(data: TUserCreated) {
    const existingEmail = await this.userModel.getByEmail(data.email);
    if (existingEmail) {
      throw new AppError(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    const existingUsername = await this.userModel.getByUsername(data.username);
    if (existingUsername) {
      throw new AppError(
        ERROR_MESSAGE.USERNAME_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async login(data: TLoginUser) {
    let user;
    if (data.email) {
      user = await this.userModel.getByEmail(data.email);
    } else if (data.username) {
      user = await this.userModel.getByUsername(data.username);
    }

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    await this.userModel.updateLastLogin(user.idUser);

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    // Remover senha do retorno
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async update(idUser: string, data: TUserUpdated) {
    const user = await this.userModel.getById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (data.email && data.email !== user.email) {
      const existingEmail = await this.userModel.getByEmail(data.email);
      if (existingEmail && existingEmail.idUser !== idUser) {
        throw new AppError(
          ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
          STATUS_CODE.CONFLICT,
        );
      }
    }

    if (data.username && data.username !== user.username) {
      const existingUsername = await this.userModel.getByUsername(
        data.username,
      );
      if (existingUsername && existingUsername.idUser !== idUser) {
        throw new AppError(
          ERROR_MESSAGE.USERNAME_ALREADY_EXISTS,
          STATUS_CODE.CONFLICT,
        );
      }
    }

    return this.userModel.update(idUser, data);
  }

  async updatePassword(idUser: string, data: TUpdateUserPassword) {
    const user = await this.userModel.getById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const userWithPassword = await this.userModel.getByUsername(user.username);
    if (!userWithPassword) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      data.oldPassword,
      userWithPassword.password,
    );
    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await this.userModel.updatePassword(idUser, hashedPassword);

    return { message: "Password updated successfully" };
  }

  async delete(idUser: string) {
    const user = await this.userModel.getById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return this.userModel.delete(idUser);
  }

  async refreshToken(idUser: string) {
    const user = await this.userModel.getById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return { token };
  }
}
