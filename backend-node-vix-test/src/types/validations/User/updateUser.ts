import { z } from "zod";
import { userCreatedSchema } from "./createUser";

export const userUpdatedSchema = userCreatedSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type TUserUpdated = z.infer<typeof userUpdatedSchema>;
