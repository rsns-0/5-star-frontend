import * as z from "zod"

export const full_country_primary_languagesSchema = z.object({
  country_id: z.number().int(),
  country_name: z.string().nullish(),
  primary_language: z.string().nullish(),
  primary_language_id: z.bigint().nullish(),
  country_name_weight: z.bigint().nullish(),
  language_name_weight: z.bigint().nullish(),
  primary_language_weight: z.number().int().nullish(),
  cca2: z.string().nullish(),
  cca3: z.string().nullish(),
  iso1: z.string().nullish(),
  iso2: z.string().nullish(),
  iso2b: z.string().nullish(),
})
