import * as z from "zod"

export const primary_language_rawSchema = z.object({
  country_id: z.number().int(),
  language_id: z.bigint().nullish(),
  weight: z.bigint().nullish(),
  rank: z.bigint().nullish(),
  language_name: z.string().nullish(),
  country_name: z.string().nullish(),
})
