import * as z from "zod"

export const full_country_primary_languages_materializedSchema = z.object({
  country_id: z.number().int(),
  country_name: z.string(),
  primary_language: z.string(),
  primary_language_id: z.bigint(),
  country_name_weight: z.bigint(),
  language_name_weight: z.bigint(),
  primary_language_weight: z.number().int(),
  cca2: z.string(),
  cca3: z.string(),
  iso1: z.string().nullish(),
  iso2: z.string(),
  iso2b: z.string().nullish(),
})
