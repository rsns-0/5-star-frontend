import * as z from "zod"

export const ties2Schema = z.object({
  country_id: z.number().int(),
  language_id: z.bigint().nullish(),
  weight: z.bigint().nullish(),
  country_name: z.string().nullish(),
  language_name: z.string().nullish(),
})
