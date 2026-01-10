import jwt, { TokenExpiredError } from "jsonwebtoken";
// import { AppError } from "../errors/AppError";

const secret = process.env.JWT_SECRET || "default_secret";

interface IPayload {
  idUser: string;
  email: string;
  role: string;
}

export const genToken = (payload: IPayload) => {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as IPayload;
  } catch (error) {
    // throws new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
    throw error;
  }
};
