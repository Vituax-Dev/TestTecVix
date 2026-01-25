import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { STATUS_CODE } from "../constants/statusCode";

export const errorHandler = (
  err:
    | AppError
    | ZodError
    | {
        status?: number;
      },
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: err.issues.map((issue) => issue.message).join(",\n ") });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === "P2002") {
      const target = err.meta?.target as string;
      // Extract field name: "user_username_key" -> "username"
      const field = target.split("_").slice(1, -1).join("_");

      const errorKeys: Record<string, string> = {
        cnpj: "errors.cnpjAlreadyExists",
        email: "errors.emailAlreadyExists",
        username: "errors.usernameAlreadyExists",
        domain: "errors.domainAlreadyExists",
      };

      const messageKey = errorKeys[field] || "errors.fieldAlreadyExists";

      return res.status(STATUS_CODE.CONFLICT).json({
        message: messageKey,
        field,
      });
    }

    // Record not found
    if (err.code === "P2025") {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message: "Record not found",
      });
    }

    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(
        process.env.NODE_ENV !== "production"
          ? err
          : { message: "Database error" },
      );
  }
  return res.status(err?.status || 500).json(err);
};
