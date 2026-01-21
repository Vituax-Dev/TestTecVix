import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
    idBrandMaster: z.number().optional(),
  }),
});
