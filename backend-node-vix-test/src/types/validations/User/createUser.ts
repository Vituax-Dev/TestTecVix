import { z } from "zod";

export const userCreatedSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"), // Make safe password,
  email: z.string().email("Invalid email"),
  phone: z.string().nullable().optional(),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "member", "manager"]).optional(),
  idBrandMaster: z.number().nullable().optional(),
  isActive: z.boolean().optional().default(true),
  fullName: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  hiringDate: z.coerce.date().nullable().optional(),
});

export type TUserCreated = z.infer<typeof userCreatedSchema>;

// Schema for manager/admin creating a new user
export const userCreatedByManagerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.string().email("Invalid email"),
  phone: z.string().nullable().optional(),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "member", "manager"]).default("member"),
  idBrandMaster: z.number().nullable().optional(),
  isActive: z.boolean().optional().default(true),
  fullName: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  hiringDate: z.coerce.date().nullable().optional(),
});

export type TUserCreatedByManager = z.infer<typeof userCreatedByManagerSchema>;
