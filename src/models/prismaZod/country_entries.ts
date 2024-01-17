import * as z from "zod"

export const country_entriesSchema = z.object({
  id: z.number().int(),
  type: z.string(),
  iso2: z.string(),
  name: z.string(),
  row_number: z.bigint(),
})
