import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha muito curta"),
    idBrandMaster: z.number().optional(),
  }),
});
