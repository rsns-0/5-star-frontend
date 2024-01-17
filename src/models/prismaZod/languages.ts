import * as z from "zod"
import { Completedeep_l_supported_languages, relateddeep_l_supported_languagesSchema, Completediscord_flag_emojis, relateddiscord_flag_emojisSchema, CompleteLingoHubIsoMappings, relatedLingoHubIsoMappingsSchema, CompleteNewCiaLanguageData, relatedNewCiaLanguageDataSchema, Completeresolve_tie_data, relatedresolve_tie_dataSchema, Completerest_countries_api_data_languages, relatedrest_countries_api_data_languagesSchema, CompleteWalsLanguageData, relatedWalsLanguageDataSchema, CompleteWikiData, relatedWikiDataSchema, Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const languagesSchema = z.object({
  id: z.bigint(),
  created_at: z.date(),
  name: z.string(),
  iso1: z.string().nullish(),
  iso2: z.string().nullish(),
  is_supported_by_deep_l: z.boolean().nullish(),
  iso2B: z.string().nullish(),
})

export interface Completelanguages extends z.infer<typeof languagesSchema> {
  deep_l_supported_languages: Completedeep_l_supported_languages[]
  discord_flag_emojis: Completediscord_flag_emojis[]
  LingoHubIsoMappings?: CompleteLingoHubIsoMappings | null
  NewCiaLanguageData: CompleteNewCiaLanguageData[]
  resolve_tie_data: Completeresolve_tie_data[]
  rest_countries_api_data_languages?: Completerest_countries_api_data_languages | null
  WalsLanguageData: CompleteWalsLanguageData[]
  WikiData: CompleteWikiData[]
  rest_countries_api_new_data: Completerest_countries_api_new_data[]
}

/**
 * relatedlanguagesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedlanguagesSchema: z.ZodSchema<Completelanguages> = z.lazy(() => languagesSchema.extend({
  deep_l_supported_languages: relateddeep_l_supported_languagesSchema.array(),
  discord_flag_emojis: relateddiscord_flag_emojisSchema.array(),
  LingoHubIsoMappings: relatedLingoHubIsoMappingsSchema.nullish(),
  NewCiaLanguageData: relatedNewCiaLanguageDataSchema.array(),
  resolve_tie_data: relatedresolve_tie_dataSchema.array(),
  rest_countries_api_data_languages: relatedrest_countries_api_data_languagesSchema.nullish(),
  WalsLanguageData: relatedWalsLanguageDataSchema.array(),
  WikiData: relatedWikiDataSchema.array(),
  rest_countries_api_new_data: relatedrest_countries_api_new_dataSchema.array(),
}))
