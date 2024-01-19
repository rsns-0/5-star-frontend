import * as z from "zod"

export const language_and_country_representationsSchema = z.object({
  id: z.number().int(),
  type: z.string(),
  iso2: z.string(),
  names: z.string().array(),
})
