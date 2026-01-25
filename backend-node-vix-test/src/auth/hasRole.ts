import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { ERole, user } from "@prisma/client";

export const hasRole = (allowedRoles: ERole[]) => {
  return (req: CustomRequest<unknown>, res: Response, next: NextFunction) => {
    const currentUser = req.user as user;
    if (!allowedRoles.includes(currentUser.role)) {
      return res
        .status(STATUS_CODE.FORBIDDEN)
        .json({ message: ERROR_MESSAGE.FORBIDDEN });
    }
    return next();
  };
};
