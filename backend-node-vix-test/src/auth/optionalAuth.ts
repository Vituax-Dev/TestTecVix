import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";
import { prisma } from "../database/client";

export const optionalAuth = async (
  req: CustomRequest<user>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next();
    }

    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { idUser: payload.idUser, deletedAt: null },
    });

    if (user) {
      req.user = user;
    }
  } catch {
    // Token inválido - apenas continua sem autenticar
  }

  return next();
};
