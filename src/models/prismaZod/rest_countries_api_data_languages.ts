import * as z from "zod"
import { Completelanguages, relatedlanguagesSchema } from "./index"

export const rest_countries_api_data_languagesSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  abbreviation: z.string(),
  languages_id: z.bigint().nullish(),
})

export interface Completerest_countries_api_data_languages extends z.infer<typeof rest_countries_api_data_languagesSchema> {
  languages?: Completelanguages | null
}

/**
 * relatedrest_countries_api_data_languagesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedrest_countries_api_data_languagesSchema: z.ZodSchema<Completerest_countries_api_data_languages> = z.lazy(() => rest_countries_api_data_languagesSchema.extend({
  languages: relatedlanguagesSchema.nullish(),
}))
