import { z } from "zod";

const brandMasterBaseSchema = z.object({
  brandName: z.string().nullable().optional(),
  isActive: z.boolean().default(false).optional(),
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
  minConsumption: z.number().nullable().optional(),
  discountPercent: z.number().min(0).max(999.99).nullable().optional(),
  contractAt: z.date().nullable().optional(),
  pocOpenedAt: z.date().nullable().optional(),
  manual: z.string().nullable().optional(),
  termsOfUse: z.string().nullable().optional(),
  privacyPolicy: z.string().nullable().optional(),
});

export const createBrandMasterSchema = brandMasterBaseSchema.extend({
  admName: z.string().nullable().optional(),
  admEmail: z.string().email(),
  admPhone: z.string().nullable().optional(),
  admPassword: z.string().min(8),
  admUsername: z.string().min(2),
});

export const updateBrandMasterSchema = brandMasterBaseSchema;

export const brandMasterSchema = brandMasterBaseSchema.extend({
  admName: z.string().nullable().optional(),
  admEmail: z.string().email().nullable().optional(),
  admPhone: z.string().nullable().optional(),
  admPassword: z.string().min(8).nullable().optional(),
  admUsername: z.string().nullable().optional(),
});

export const idBrandMasterParamsSchema = z.object({
  idBrandMaster: z.coerce.number().int().positive(),
});

export type TBrandMaster = z.infer<typeof brandMasterSchema>;
export type TCreateBrandMaster = z.infer<typeof createBrandMasterSchema>;
export type TUpdateBrandMaster = z.infer<typeof updateBrandMasterSchema>;
