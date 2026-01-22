import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { ERROR_MESSAGE } from '../constants/erroMessages';
import { STATUS_CODE } from '../constants/statusCode';

const secret = process.env.JWT_SECRET as string;

interface JwtPayload {
  idUser: string;
  email: string;
  role: string;
  idBrandMaster?: number | null;
}

export const genToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '24h',
  });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
