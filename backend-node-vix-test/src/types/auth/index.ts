import { z } from "zod";
import { loginSchema, registerSchema } from "../../schemas/auth.schema";

export type LoginDTO = z.infer<typeof loginSchema>["body"];
export type RegisterDTO = z.infer<typeof registerSchema>["body"];

export interface AuthResponse {
  user: {
    idUser: string;
    username: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface IPayload {
  id: string;
  role: string;
  brandId?: number | null;
}
