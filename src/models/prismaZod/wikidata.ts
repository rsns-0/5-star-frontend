import * as z from "zod"
import { Completelanguages, relatedlanguagesSchema, Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const wikiDataSchema = z.object({
  id: z.number().int(),
  widely_spoken: z.string(),
  country_or_region: z.string(),
  minority_language: z.string(),
  national_language: z.string(),
  official_language: z.string(),
  regional_language: z.string(),
  primary_language: z.string(),
  languages_id: z.bigint().nullish(),
  rest_countries_api_new_data_id: z.number().int().nullish(),
})

export interface CompleteWikiData extends z.infer<typeof wikiDataSchema> {
  languages?: Completelanguages | null
  rest_countries_api_new_data?: Completerest_countries_api_new_data | null
}

/**
 * relatedWikiDataSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWikiDataSchema: z.ZodSchema<CompleteWikiData> = z.lazy(() => wikiDataSchema.extend({
  languages: relatedlanguagesSchema.nullish(),
  rest_countries_api_new_data: relatedrest_countries_api_new_dataSchema.nullish(),
}))
