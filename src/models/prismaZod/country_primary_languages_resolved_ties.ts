import * as z from "zod"

export const country_primary_languages_resolved_tiesSchema = z.object({
  country_id: z.number().int(),
  language_id: z.bigint().nullish(),
  weight: z.bigint().nullish(),
  country_name: z.string().nullish(),
  language_name: z.string().nullish(),
  rank: z.bigint().nullish(),
})
