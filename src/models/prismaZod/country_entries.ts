import * as z from "zod"

export const country_entriesSchema = z.object({
  id: z.number().int(),
  iso2: z.string(),
  name: z.string(),
  source: z.string(),
})
