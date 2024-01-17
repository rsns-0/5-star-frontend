import * as z from "zod"
import { Completelanguages, relatedlanguagesSchema } from "./index"

export const walsLanguageDataSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  walsCode: z.string(),
  iso6393: z.string().nullish(),
  genus: z.string(),
  family: z.string(),
  macroarea: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  countries: z.string(),
  languages_id: z.bigint().nullish(),
})

export interface CompleteWalsLanguageData extends z.infer<typeof walsLanguageDataSchema> {
  languages?: Completelanguages | null
}

/**
 * relatedWalsLanguageDataSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWalsLanguageDataSchema: z.ZodSchema<CompleteWalsLanguageData> = z.lazy(() => walsLanguageDataSchema.extend({
  languages: relatedlanguagesSchema.nullish(),
}))
