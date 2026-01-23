import { Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken, genToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";
import { prisma } from "../database/client";
import { COOKIE_OPTIONS } from "../utils/cookie";

export const authUser = async (
  req: CustomRequest<user>,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }

  const payload = verifyToken(token);

  const user = await prisma.user.findUnique({
    where: { idUser: payload.idUser, deletedAt: null },
  });

  if (!user) {
    throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }

  // Renova o token a cada requisição autenticada
  const newToken = genToken({
    idUser: user.idUser,
    email: user.email,
    role: user.role,
  });

  res.cookie("token", newToken, COOKIE_OPTIONS);

  req.user = user;
  return next();
};
