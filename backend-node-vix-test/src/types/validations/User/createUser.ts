import { z } from "zod";

export const userCreatedSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(2, "Username must be at least 2 characters long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "member", "manager"]).optional(),
  idBrandMaster: z.number().optional(),
  isActive: z.boolean().optional().default(true),
});

export type TUserCreate = z.infer<typeof userCreatedSchema>;
