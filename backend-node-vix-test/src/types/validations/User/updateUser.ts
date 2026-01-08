import { z } from "zod";
import { userCreatedSchema } from "./createUser";

export const userUpdatedSchema = userCreatedSchema.partial();

export type TUserUpdated = z.infer<typeof userUpdatedSchema>;
