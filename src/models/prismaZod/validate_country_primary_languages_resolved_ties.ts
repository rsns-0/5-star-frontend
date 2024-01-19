import * as z from "zod"

export const validate_country_primary_languages_resolved_tiesSchema = z.object({
  country_id: z.number().int(),
  country_count: z.bigint(),
})
