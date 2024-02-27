import * as z from "zod"

export const language_entriesSchema = z.object({
  id: z.bigint(),
  iso2: z.string(),
  name: z.string(),
  source: z.string(),
})
