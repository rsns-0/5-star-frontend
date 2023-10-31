import * as z from "zod"
import { CompleteProcessedLangData, relatedProcessedLangDataSchema, Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const rest_countries_api_data_namesSchema = z.object({
  id: z.number().int(),
  common: z.string(),
  official: z.string(),
  nativeName: jsonSchema,
})

export interface Completerest_countries_api_data_names extends z.infer<typeof rest_countries_api_data_namesSchema> {
  ProcessedLangData?: CompleteProcessedLangData | null
  rest_countries_api_new_data?: Completerest_countries_api_new_data | null
}

/**
 * relatedrest_countries_api_data_namesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedrest_countries_api_data_namesSchema: z.ZodSchema<Completerest_countries_api_data_names> = z.lazy(() => rest_countries_api_data_namesSchema.extend({
  ProcessedLangData: relatedProcessedLangDataSchema.nullish(),
  rest_countries_api_new_data: relatedrest_countries_api_new_dataSchema.nullish(),
}))
