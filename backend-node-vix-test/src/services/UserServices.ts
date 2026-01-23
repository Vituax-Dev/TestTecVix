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

    const passwordMatch = await bcrypt.compare(password, user.password);

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

  async create(userData: any) {
    const { email, password, username, role, idBrandMaster } = userData;

    const userExists = await prisma.user.findFirst({
      where: { email }
    });

    if (userExists) {
      throw new AppError("Este e-mail já está cadastrado.", STATUS_CODE.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
    const user = await prisma.user.create({
      data: {
        email: email.trim(),
        username: username.trim(),
        password: hashedPassword,
        role: role || "member", 
        isActive: true,
        ...(idBrandMaster && { idBrandMaster }) 
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error: any) {
    console.error("Erro ao criar usuário no Prisma:", error.message);
    throw new AppError("Erro interno ao criar usuário.", 500);
  }
  }
}