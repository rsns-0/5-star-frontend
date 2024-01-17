import * as z from "zod"
import { CompleteCongressIsoMappings, relatedCongressIsoMappingsSchema, Completelanguages, relatedlanguagesSchema } from "./index"

export const lingoHubIsoMappingsSchema = z.object({
  id: z.number().int(),
  iso1: z.string(),
  name: z.string(),
  languagesId: z.bigint().nullish(),
})

export interface CompleteLingoHubIsoMappings extends z.infer<typeof lingoHubIsoMappingsSchema> {
  congressIsoMappings: CompleteCongressIsoMappings
  languages?: Completelanguages | null
}

/**
 * relatedLingoHubIsoMappingsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedLingoHubIsoMappingsSchema: z.ZodSchema<CompleteLingoHubIsoMappings> = z.lazy(() => lingoHubIsoMappingsSchema.extend({
  congressIsoMappings: relatedCongressIsoMappingsSchema,
  languages: relatedlanguagesSchema.nullish(),
}))
