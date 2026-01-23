import { CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
};

export const COOKIE_MAX_AGE = 60 * 60 * 1000; // 1 hora
