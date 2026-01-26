import { z } from "zod";

const EVMStatus = z.enum(["RUNNING", "STOPPED", "PAUSED"]);
const ETaskLocation = z.enum(["bre_barueri", "usa_miami"]);

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
  pass: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Senha é opcional
      return (
        val.length >= 8 &&
        passwordRegex.numbers.test(val) &&
        passwordRegex.lowercase.test(val) &&
        passwordRegex.uppercase.test(val) &&
        passwordRegex.special.test(val)
      );
    }, {
      message: "Password must have at least 8 characters, 2 numbers, 2 lowercase, 2 uppercase, and 2 special characters"
    }),
  location: ETaskLocation.optional().default("bre_barueri"),
  idBrandMaster: z.number().nullable().optional(),
  status: EVMStatus.optional(),
  os: z.string().optional(),
});

export type TVMCreate = z.infer<typeof vMCreatedSchema>;
