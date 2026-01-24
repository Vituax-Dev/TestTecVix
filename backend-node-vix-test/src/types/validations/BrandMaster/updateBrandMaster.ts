import { z } from "zod";

export const brandMasterUpdatedSchema = z.object({
  idBrandMaster: z.number().optional(),
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
  contractAt: z.date().nullable().optional(),
  pocOpenedAt: z.date().nullable().optional(),
  manual: z.string().nullable().optional(),
  termsOfUse: z.string().nullable().optional(),
  privacyPolicy: z.string().nullable().optional(),
}).passthrough();

export type TBrandMasterUpdate = z.infer<typeof brandMasterUpdatedSchema>;
