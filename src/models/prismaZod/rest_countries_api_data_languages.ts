import * as z from "zod"
import { Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const rest_countries_api_data_languagesSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  abbreviation: z.string(),
})

export interface Completerest_countries_api_data_languages extends z.infer<typeof rest_countries_api_data_languagesSchema> {
  rest_countries_api_new_data: Completerest_countries_api_new_data[]
}

/**
 * relatedrest_countries_api_data_languagesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedrest_countries_api_data_languagesSchema: z.ZodSchema<Completerest_countries_api_data_languages> = z.lazy(() => rest_countries_api_data_languagesSchema.extend({
  rest_countries_api_new_data: relatedrest_countries_api_new_dataSchema.array(),
}))
