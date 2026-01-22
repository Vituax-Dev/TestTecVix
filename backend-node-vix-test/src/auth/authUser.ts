import { Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";
import { prisma } from "../database/client";

export const authUser = async (
  req: CustomRequest<user>,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
  const token = authorization.split(" ")[1];

  const payload = verifyToken(token);
  if (!payload) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }

  const user = await prisma.user.findUnique({
    where: { idUser: payload.idUser, deletedAt: null },
  });

  if (!user || !user.isActive) {
    throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.UNAUTHORIZED);
  }

  req.user = user;
  return next();
};
