import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken } from "../utils/jwt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Estender Request do Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        idUser: string;
        email: string;
        role: string;
        idBrandMaster?: number | null;
      };
    }
  }
}

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) {
      throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
    }
    
    const token = authorization.split(" ")[1];
    const decoded = verifyToken(token);
    
    // Buscar usuário no banco
    const user = await prisma.user.findFirst({
      where: { 
        idUser: decoded.idUser,
        isActive: true,
        deletedAt: null
      },
    });

    if (!user) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    // Atribuir dados mínimos ao req.user
    req.user = {
      idUser: user.idUser,
      email: user.email,
      role: user.role,
      idBrandMaster: user.idBrandMaster,
    };

    next();
  } catch (error) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
