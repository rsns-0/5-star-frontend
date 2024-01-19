import * as z from "zod"
import { Completelanguages, relatedlanguagesSchema, Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const resolve_tie_dataSchema = z.object({
  id: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
  rest_countries_api_new_data_id: z.number().int(),
  languages_id: z.bigint().nullish(),
})

export interface Completeresolve_tie_data extends z.infer<typeof resolve_tie_dataSchema> {
  languages?: Completelanguages | null
  rest_countries_api_new_data: Completerest_countries_api_new_data
}

/**
 * relatedresolve_tie_dataSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedresolve_tie_dataSchema: z.ZodSchema<Completeresolve_tie_data> = z.lazy(() => resolve_tie_dataSchema.extend({
  languages: relatedlanguagesSchema.nullish(),
  rest_countries_api_new_data: relatedrest_countries_api_new_dataSchema,
}))
