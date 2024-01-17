import * as z from "zod"
import { Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const wikiIsoDataSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  official_state_name: z.string(),
  sovereignty: z.string(),
  iso2: z.string(),
  iso3: z.string(),
  numeric_code: z.string(),
  subdivision_code_links: z.string(),
  internet_cc_tld: z.string(),
  rest_countries_data_id: z.number().int(),
})

export interface CompleteWikiIsoData extends z.infer<typeof wikiIsoDataSchema> {
  rest_countries_data: Completerest_countries_api_new_data
}

/**
 * relatedWikiIsoDataSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWikiIsoDataSchema: z.ZodSchema<CompleteWikiIsoData> = z.lazy(() => wikiIsoDataSchema.extend({
  rest_countries_data: relatedrest_countries_api_new_dataSchema,
}))
