import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  email: z.string().email("Email deve ter um formato válido"),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "manager", "member"]).default("member"),
  idBrandMaster: z.number().nullable().optional(),
  isActive: z.boolean().default(true),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
    .optional(),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .optional(),
  email: z.string().email("Email deve ter um formato válido").optional(),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "manager", "member"]).optional(),
  idBrandMaster: z.number().nullable().optional(),
  isActive: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Email deve ter um formato válido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type TCreateUser = z.infer<typeof createUserSchema>;
export type TUpdateUser = z.infer<typeof updateUserSchema>;
export type TLogin = z.infer<typeof loginSchema>;
