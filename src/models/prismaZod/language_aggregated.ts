import * as z from "zod"

export const language_aggregatedSchema = z.object({
  id: z.bigint(),
  iso_639_1: z.string().nullish(),
  iso_639_2: z.string(),
  name: z.string(),
  weight: z.bigint(),
  iso_639_2b: z.string().nullish(),
})
