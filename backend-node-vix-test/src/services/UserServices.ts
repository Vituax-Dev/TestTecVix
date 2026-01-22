import { prisma } from "../database/client";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcrypt";
import { genToken } from "../utils/jwt";

export class UserService {
  async authenticate({ email, password }: any) {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED);
    }

    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED);
    }

    const token = genToken({ idUser: user.idUser, role: user.role });

    return {
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      token
    };
  }
}