import * as z from "zod"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const processed_lang_data_v1Schema = z.object({
  id: z.number().int(),
  common: z.string(),
  official: z.string(),
  nativeName: jsonSchema,
  fuzzy_official_top_country: z.string(),
  fuzzy_official_top_country_similarity: z.number().int(),
  fuzzy_common_top_country: z.string(),
  fuzzy_common_top_country_similarity: z.number().int(),
  max_official_score_between_common_and_official: z.number().int(),
  country: z.string(),
  primary_language: z.string(),
  fuzzy_top_country_or_region: z.string(),
  fuzzy_top_country_or_region_similarity: z.number().int(),
  widely_spoken: z.string(),
  country_or_region: z.string(),
  minority_language: z.string(),
  national_language: z.string(),
  official_language: z.string(),
  regional_language: z.string(),
  primary_language_wiki: z.string(),
  rest_countries_api_data_names_id: z.number().int(),
})
