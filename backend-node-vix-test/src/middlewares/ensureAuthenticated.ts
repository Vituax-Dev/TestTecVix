import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not provided", STATUS_CODE.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Malformed token", STATUS_CODE.UNAUTHORIZED);
  }

  try {
    const userPayload = verifyToken(token);

    req.user = userPayload;

    return next();
  } catch (error) {
    console.error("[Auth Middleware Error]:", error);
    throw new AppError("Invalid or expired token", STATUS_CODE.UNAUTHORIZED);
  }
};
