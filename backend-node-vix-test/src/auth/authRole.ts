import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

type Role = 'admin' | 'manager' | 'member';

export const authRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as Role;

    if (!userRole) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(userRole)) {
      throw new AppError(
        'Acesso negado: permissão insuficiente',
        STATUS_CODE.FORBIDDEN
      );
    }

    next();
  };
};
