import { z } from "zod";

// Schema do admin (obrigatório na criação de MSP)
const adminSchema = z.object({
  username: z.string().min(1, "Nome do admin é obrigatório"),
  email: z.string().email("Email do admin inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  phone: z.string().optional(),
});

// Schema para criação de MSP (sempre com admin obrigatório)
export const brandMasterSchema = z.object({
  brandName: z.string().nullable().optional(),
  isActive: z.boolean().default(true).optional(),
  brandLogo: z.string().nullable().optional(),
  domain: z.string().nullable().optional(),
  contract: z.string().nullable().optional(),
  setorName: z.string().nullable().optional(),
  fieldName: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  emailContact: z.string().nullable().optional(),
  smsContact: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  placeNumber: z.string().nullable().optional(),
  cep: z.string().nullable().optional(),
  cnpj: z.string().nullable().optional(),
  cityCode: z.number().nullable().optional(),
  district: z.string().nullable().optional(),
  isPoc: z.boolean().default(false).optional(),
  contractAt: z.date().nullable().optional(),
  pocOpenedAt: z.date().nullable().optional(),
  manual: z.string().nullable().optional(),
  termsOfUse: z.string().nullable().optional(),
  privacyPolicy: z.string().nullable().optional(),
  minConsumption: z.number().nullable().optional(),
  discountPercentage: z.number().nullable().optional(),
  // Admin obrigatório na criação
  admin: adminSchema,
});

export type TBrandMaster = z.infer<typeof brandMasterSchema>;

// Schema para update (sem admin)
export const brandMasterUpdateSchema = brandMasterSchema.omit({ admin: true });
export type TBrandMasterUpdate = z.infer<typeof brandMasterUpdateSchema>;
