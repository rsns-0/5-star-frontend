import * as z from "zod"

export const unresolved_tiesSchema = z.object({
  country_id: z.number().int(),
  country_name: z.string(),
})
