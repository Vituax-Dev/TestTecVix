import { z } from "zod";
import { vMCreatedSchema } from "./createVM";

export const vMUpdatedSchema = vMCreatedSchema.partial();

export type TVMUpdate = z.infer<typeof vMUpdatedSchema>;
