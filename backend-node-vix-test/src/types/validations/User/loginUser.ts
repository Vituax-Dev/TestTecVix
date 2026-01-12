import { z } from "zod";

export const loginUserSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6),
  })
  .refine((data) => data.username || data.email, {
    message: "Either username or email must be provided",
  });

export type TLoginUser = z.infer<typeof loginUserSchema>;
