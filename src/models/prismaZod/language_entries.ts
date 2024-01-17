import * as z from "zod"

export const language_entriesSchema = z.object({
  id: z.bigint(),
  type: z.string(),
  iso2: z.string(),
  name: z.string(),
  row_number: z.bigint(),
})
