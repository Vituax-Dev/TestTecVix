import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret";

interface IPayload {
  idUser: string;
  email: string;
  role: string;
}

export const genToken = (payload: IPayload): string => {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): IPayload | null => {
  try {
    return jwt.verify(token, secret) as IPayload;
  } catch {
    return null;
  }
};
