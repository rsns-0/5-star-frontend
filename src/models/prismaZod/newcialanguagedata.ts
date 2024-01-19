import * as z from "zod"
import { Completelanguages, relatedlanguagesSchema, Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const newCiaLanguageDataSchema = z.object({
  id: z.number().int(),
  country: z.string(),
  primary_language: z.string(),
  languages_id: z.bigint().nullish(),
  rest_countries_api_new_data_id: z.number().int().nullish(),
})

export interface CompleteNewCiaLanguageData extends z.infer<typeof newCiaLanguageDataSchema> {
  languages?: Completelanguages | null
  rest_countries_api_new_data?: Completerest_countries_api_new_data | null
}

/**
 * relatedNewCiaLanguageDataSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedNewCiaLanguageDataSchema: z.ZodSchema<CompleteNewCiaLanguageData> = z.lazy(() => newCiaLanguageDataSchema.extend({
  languages: relatedlanguagesSchema.nullish(),
  rest_countries_api_new_data: relatedrest_countries_api_new_dataSchema.nullish(),
}))
