import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";
import { prisma } from "../database/client";

export const optionalAuthUser = async (
  req: CustomRequest<user>,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(" ")[1];
    const { idUser } = verifyToken(token);

    if (idUser) {
      const user = await prisma.user.findUnique({
        where: { idUser },
      });

      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    // ignora erros de token inválido
  }

  return next();
};
