import { z } from "zod";

export const idUserParamsSchema = z.object({
  idUser: z.string().uuid("Invalid user ID format"),
});

export type TIdUserParams = z.infer<typeof idUserParamsSchema>;
