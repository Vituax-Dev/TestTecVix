import { Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";

export type UserRole = "admin" | "manager" | "member";

export interface PermissionConfig {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export const PERMISSIONS: Record<UserRole, PermissionConfig> = {
  member: {
    read: true,
    create: false,
    update: false,
    delete: false,
  },
  manager: {
    read: true,
    create: true,
    update: true,
    delete: false,
  },
  admin: {
    read: true,
    create: true,
    update: true,
    delete: true,
  },
};

export const hasPermission = (
  role: string,
  action: keyof PermissionConfig,
): boolean => {
  const userRole = role as UserRole;
  return PERMISSIONS[userRole]?.[action] ?? false;
};

export const requirePermission = (action: keyof PermissionConfig) => {
  return (req: CustomRequest<user>, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as UserRole;

    if (!userRole || !hasPermission(userRole, action)) {
      throw new AppError(
        `Acesso negado. Você não possui permissão para ${
          action === "create"
            ? "criar"
            : action === "update"
              ? "editar"
              : action === "delete"
                ? "deletar"
                : "acessar"
        } este recurso.`,
        STATUS_CODE.FORBIDDEN,
      );
    }

    next();
  };
};

// Middlewares específicos para cada ação
export const canCreate = requirePermission("create");
export const canUpdate = requirePermission("update");
export const canDelete = requirePermission("delete");

// Middleware para verificar se é admin
export const isAdmin = (
  req: CustomRequest<user>,
  res: Response,
  next: NextFunction,
) => {
  const userRole = req.user?.role as UserRole;

  if (userRole !== "admin") {
    throw new AppError(
      "Acesso negado. Apenas administradores podem realizar esta ação.",
      STATUS_CODE.FORBIDDEN,
    );
  }

  next();
};

// Middleware para verificar se é manager ou admin
export const isManagerOrAdmin = (
  req: CustomRequest<user>,
  res: Response,
  next: NextFunction,
) => {
  const userRole = req.user?.role as UserRole;

  if (userRole !== "admin" && userRole !== "manager") {
    throw new AppError(
      "Acesso negado. Apenas gerentes ou administradores podem realizar esta ação.",
      STATUS_CODE.FORBIDDEN,
    );
  }

  next();
};
