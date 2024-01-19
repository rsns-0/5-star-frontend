import * as z from "zod"

export const country_aggregatedSchema = z.object({
  id: z.number().int(),
  cca3: z.string(),
  cca2: z.string(),
  name: z.string(),
  weight: z.bigint(),
})
