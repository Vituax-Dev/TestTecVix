import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { user } from "@prisma/client";

export const isSelfOrIsManagerOrIsAdm = (
  req: CustomRequest<user>,
  _res: Response,
  next: NextFunction,
) => {
  const user = req.user as user;

  const idUserFromParams = req.params.idUser;

  const isSelf = user.idUser === idUserFromParams;

  if (isSelf) return next();

  if (user.role !== "admin" && user.role !== "manager") {
    throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }

  return next();
};
