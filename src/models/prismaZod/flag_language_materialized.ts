import * as z from "zod"

export const flag_language_materializedSchema = z.object({
  id: z.number().int(),
  flag_key: z.string(),
  flag_emoji: z.string(),
  country_name: z.string(),
  primary_language: z.string(),
  primary_language_id: z.number().int(),
  cca2: z.string(),
  cca3: z.string(),
  iso1: z.string().nullish(),
  iso2: z.string(),
  iso2b: z.string().nullish(),
  is_supported_by_deep_l: z.boolean(),
  country_name_weight: z.number().int(),
  language_name_weight: z.number().int(),
  primary_language_weight: z.number().int(),
})
