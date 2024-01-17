import * as z from "zod"
import { Completelanguages, relatedlanguagesSchema } from "./index"

export const deep_l_supported_languagesSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  abbreviation: z.string(),
  languages_id: z.bigint().nullish(),
})

export interface Completedeep_l_supported_languages extends z.infer<typeof deep_l_supported_languagesSchema> {
  languages?: Completelanguages | null
}

/**
 * relateddeep_l_supported_languagesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relateddeep_l_supported_languagesSchema: z.ZodSchema<Completedeep_l_supported_languages> = z.lazy(() => deep_l_supported_languagesSchema.extend({
  languages: relatedlanguagesSchema.nullish(),
}))
