import { z } from "zod";
import { vMCreatedSchema } from "./createVM";

export const vMUpdatedSchema = z.object({
  vmName: z.string().optional(),
  vCPU: z.number().optional(),
  ram: z.number().optional(),
  disk: z.number().optional(),
  hasBackup: z.boolean().optional(),
  os: z.string().optional(),
  pass: z.string().optional(),
});

export type TVMUpdate = z.infer<typeof vMUpdatedSchema>;
