import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { genToken } from "../utils/jwt";
import { loginUserSchema } from "../types/validations/User/loginUser";
import { userCreatedSchema } from "../types/validations/User/createUser";

export class UserService {
  private userModel = new UserModel();

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

    const updateData = data as { password?: string; [key: string]: unknown };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.userModel.update(idUser, updateData);
  }

  async delete(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    return this.userModel.softDelete(idUser);
  }
}
