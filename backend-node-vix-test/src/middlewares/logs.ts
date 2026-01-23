import { Request, Response, NextFunction } from "express";

export const logs = (req: Request, _res: Response, next: NextFunction) => {
  const dev = process.env.NODE_ENV !== "production";
  if (!dev) return next();
  const { method, url, body, query } = req;

  const sanitizedBody = body?.password
    ? { ...body, password: "[REDACTED]" }
    : body;

  console.log(
    `____________________________________\n ${method} - ${url}${query && Object.keys(query).length ? `\nquery: ${JSON.stringify(query, null, 2)}` : ""}${sanitizedBody && Object.keys(sanitizedBody).length ? `\nbody:${JSON.stringify(sanitizedBody, null, 2)}` : ""}\n____________________________________`,
  );
  next();
};
