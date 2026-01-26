import { z } from "zod";

export const updateMeSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    )
    .optional(),
  email: z.string().email("Invalid email").optional(),
  fullName: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  profileImgUrl: z.string().nullable().optional(),
});

export type TUpdateMe = z.infer<typeof updateMeSchema>;
