import { prisma } from "../database/client";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcrypt";
import { genToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

export class UserService {
  async authenticate({ email, password }: any) {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      throw new AppError(ERROR_MESSAGE.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED);
    }

    //Feito para garantir o hash das senhas e garantir o funcionamento das credenciais de testes criadas via seeds.
    const isHash = user.password.startsWith("$2a$") ||
      user.password.startsWith("$2b$") ||
      user.password.startsWith("$2y$");

    let isPasswordValid = false;

    if (isHash) {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      isPasswordValid = user.password === password;
    }

    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const token = genToken({ idUser: user.idUser, role: user.role , idBrandMaster: user.idBrandMaster});

    return {
      user: {
        idUser: user.idUser,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        profileImgUrl: user.profileImgUrl,
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

  async generateNewToken(idUser: string ) {
  const user = await prisma.user.findUnique({
    where: { idUser },
  });

  if (!user || !user.isActive) {
    throw new Error("Usuário inválido para renovação de token.");
  }

  const token = jwt.sign(
    { 
      idUser: user.idUser, 
      role: user.role, 
      idBrandMaster: user.idBrandMaster 
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" } 
  );

  return { token };
}
}