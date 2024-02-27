import * as z from "zod"
import { Completecountry_emoji, relatedcountry_emojiSchema, Completediscord_flag_emojis, relateddiscord_flag_emojisSchema, CompleteIBANCountryCodeData, relatedIBANCountryCodeDataSchema, CompleteNewCiaLanguageData, relatedNewCiaLanguageDataSchema, Completeresolve_tie_data, relatedresolve_tie_dataSchema, Completerest_countries_api_data_names, relatedrest_countries_api_data_namesSchema, CompleteWikiData, relatedWikiDataSchema, CompleteWikiIsoData, relatedWikiIsoDataSchema, Completelanguages, relatedlanguagesSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const rest_countries_api_new_dataSchema = z.object({
  id: z.number().int(),
  cca2: z.string(),
  ccn3: z.string().nullish(),
  cca3: z.string(),
  cioc: z.string().nullish(),
  independent: z.boolean().nullish(),
  unMember: z.boolean(),
  capital: z.string().array(),
  altSpellings: z.string().array(),
  subregion: z.string().nullish(),
  translations: jsonSchema,
  latlng: z.number().array(),
  landlocked: z.boolean(),
  borders: z.string().array(),
  area: z.number(),
  flag: z.string(),
  population: z.number().int(),
  gini: jsonSchema,
  fifa: z.string().nullish(),
  timezones: z.string().array(),
  capitalInfo: jsonSchema,
  car: jsonSchema,
  coatOfArms: jsonSchema,
  flags: jsonSchema,
  idd: jsonSchema,
  maps: jsonSchema,
  name: z.string(),
  postalCode: jsonSchema,
  status: z.string(),
  region: z.string(),
  continents: z.string().array(),
  startOfWeek: jsonSchema,
  currencies: jsonSchema,
  demonyms: jsonSchema,
  rest_countries_api_data_names_id: z.number().int(),
  spoken_languages: jsonSchema,
})

export interface Completerest_countries_api_new_data extends z.infer<typeof rest_countries_api_new_dataSchema> {
  country_emoji: Completecountry_emoji[]
  discord_flag_emojis?: Completediscord_flag_emojis | null
  IBANCountryCodeData: CompleteIBANCountryCodeData[]
  NewCiaLanguageData: CompleteNewCiaLanguageData[]
  resolve_tie_data?: Completeresolve_tie_data | null
  rest_countries_api_data_names: Completerest_countries_api_data_names
  WikiData: CompleteWikiData[]
  WikiIsoData?: CompleteWikiIsoData | null
  languages: Completelanguages[]
}

/**
 * relatedrest_countries_api_new_dataSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedrest_countries_api_new_dataSchema: z.ZodSchema<Completerest_countries_api_new_data> = z.lazy(() => rest_countries_api_new_dataSchema.extend({
  country_emoji: relatedcountry_emojiSchema.array(),
  discord_flag_emojis: relateddiscord_flag_emojisSchema.nullish(),
  IBANCountryCodeData: relatedIBANCountryCodeDataSchema.array(),
  NewCiaLanguageData: relatedNewCiaLanguageDataSchema.array(),
  resolve_tie_data: relatedresolve_tie_dataSchema.nullish(),
  rest_countries_api_data_names: relatedrest_countries_api_data_namesSchema,
  WikiData: relatedWikiDataSchema.array(),
  WikiIsoData: relatedWikiIsoDataSchema.nullish(),
  languages: relatedlanguagesSchema.array(),
}))
