import * as z from "zod"
import { Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const iBANCountryCodeDataSchema = z.object({
  id: z.number().int(),
  alpha2Code: z.string(),
  alpha3Code: z.string(),
  numericCode: z.number().int(),
  country: z.string(),
  rest_countries_api_new_data_id: z.number().int().nullish(),
})

export interface CompleteIBANCountryCodeData extends z.infer<typeof iBANCountryCodeDataSchema> {
  rest_countries?: Completerest_countries_api_new_data | null
}

/**
 * relatedIBANCountryCodeDataSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedIBANCountryCodeDataSchema: z.ZodSchema<CompleteIBANCountryCodeData> = z.lazy(() => iBANCountryCodeDataSchema.extend({
  rest_countries: relatedrest_countries_api_new_dataSchema.nullish(),
}))
