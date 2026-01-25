import { z } from "zod";
import { querySchema } from "../Queries/queryListAll";
import { ERole } from "@prisma/client";
const ROLES = Object.values(ERole) as [ERole, ...ERole[]];

export const userListAllSchema = querySchema.extend({
  role: z
    .enum(ROLES)
    .optional()
    .transform((val) => val || undefined),
});

export type TQueryUser = z.infer<typeof userListAllSchema>;
