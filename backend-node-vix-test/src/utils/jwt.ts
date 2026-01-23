import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { ERROR_MESSAGE } from "../constants/erroMessages";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const secret = process.env.JWT_SECRET;

interface ITokenPayload {
  idUser: string;
  email: string;
  role: string;
}

export const genToken = (payload: ITokenPayload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string): ITokenPayload => {
  try {
    const data = jwt.verify(token, secret) as ITokenPayload;
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError("Token expired", STATUS_CODE.UNAUTHORIZED);
    }
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
