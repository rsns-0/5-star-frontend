import * as z from "zod"
import { continents } from "@prisma/client"

export const countriesSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  iso2: z.string(),
  iso3: z.string(),
  local_name: z.string().nullish(),
  continent: z.nativeEnum(continents).nullish(),
  flag: z.string().nullish(),
})
