/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/jwt";
import { z } from "zod";
import { prisma } from "../database/client";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "manager", "member"]).optional(),
  idBrandMaster: z.number().optional(),
});

export class AuthService {
  constructor() {}
  private userModel = new UserModel();

  async login(data: unknown) {
    const { email, password } = loginSchema.parse(data);

    const user = await this.userModel.findByEmail(email);

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    await prisma.user.update({
      where: { idUser: user.idUser },
      data: { lastLoginDate: new Date() },
    });

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async register(data: unknown) {
    const validData = registerSchema.parse(data);

    const existingUser = await this.userModel.findByEmail(validData.email);

    if (existingUser) {
      throw new AppError(
        ERROR_MESSAGE.USER_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const newUser = await this.userModel.createNewUser({
      ...validData,
      password: hashedPassword,
      isActive: true,
      role: "member",
    });

    const token = genToken({
      idUser: newUser.idUser,
      email: newUser.email,
      role: newUser.role,
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async getNewToken(idUser: string) {
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
