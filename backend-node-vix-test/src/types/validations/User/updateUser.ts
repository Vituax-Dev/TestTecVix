import { z } from "zod";
import { userCreatedSchema } from "./createUser";

export const userUpdatedSchema = userCreatedSchema
  .partial()
  .extend({
    currentPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Current password is required to change password",
      path: ["currentPassword"],
    }
  );

export type TUserUpdated = z.infer<typeof userUpdatedSchema>;
