import { z } from "zod";

const EVMStatus = z.enum(["RUNNING", "STOPPED", "PAUSED"]);
const ETaskLocation = z.enum(["bre_barueri", "usa_miami"]);
const ENetworkType = z.enum(["public", "private", "public_private"]);
const EStorageType = z.enum(["ssd", "hd"]);

// Password validation regex
export const passwordRegex = {
  numbers: /(?=.*\d.*\d)/,
  lowercase: /(?=.*[a-z].*[a-z])/,
  uppercase: /(?=.*[A-Z].*[A-Z])/,
  special:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
};

export const vMCreatedSchema = z.object({
  vmName: z.string().optional(),
  vCPU: z.number().min(1, "vCPU must be at least 1"),
  ram: z.number().min(1, "RAM must be at least 1 GB"),
  disk: z.number().min(20, "Disk must be at least 20 GBs"),
  hasBackup: z.boolean().optional().default(false),
  pass: z.string().min(12, "Password must be at least 12 characters"),
  location: ETaskLocation,
  networkType: ENetworkType,
  storageType: EStorageType,
  idBrandMaster: z.number().nullable().optional(),
  status: EVMStatus.optional(),
  os: z.string().optional(),
});

export const idVMParamsSchema = z.object({
  idVM: z.coerce.number().int().positive(),
});

export type TVMCreate = z.infer<typeof vMCreatedSchema>;
