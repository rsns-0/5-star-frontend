import * as z from "zod"

export const combined_dataSchema = z.object({
  id: z.number().int(),
  c_id: z.number().int().nullish(),
  l_id: z.bigint().nullish(),
  source: z.string().nullish(),
})
