import * as z from "zod"
import { CompleteLingoHubIsoMappings, relatedLingoHubIsoMappingsSchema } from "./index"

export const congressIsoMappingsSchema = z.object({
  id: z.number().int(),
  iso_639_2: z.string(),
  iso_639_1: z.string().nullish(),
  name: z.string(),
  french_name_of_language: z.string(),
  german_name_of_language: z.string(),
  languagesId: z.bigint().nullish(),
})

export interface CompleteCongressIsoMappings extends z.infer<typeof congressIsoMappingsSchema> {
  LingoHubIsoMappings?: CompleteLingoHubIsoMappings | null
}

/**
 * relatedCongressIsoMappingsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCongressIsoMappingsSchema: z.ZodSchema<CompleteCongressIsoMappings> = z.lazy(() => congressIsoMappingsSchema.extend({
  LingoHubIsoMappings: relatedLingoHubIsoMappingsSchema.nullish(),
}))
