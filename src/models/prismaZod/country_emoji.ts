import * as z from "zod"
import { Completerest_countries_api_new_data, relatedrest_countries_api_new_dataSchema } from "./index"

export const country_emojiSchema = z.object({
  id: z.number().int(),
  iso: z.string(),
  emoji: z.string(),
  unicode: z.string(),
  name: z.string(),
  rest_countries_api_new_data_id: z.number().int(),
})

export interface Completecountry_emoji extends z.infer<typeof country_emojiSchema> {
  rest_countries_api_new_data: Completerest_countries_api_new_data
}

/**
 * relatedcountry_emojiSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedcountry_emojiSchema: z.ZodSchema<Completecountry_emoji> = z.lazy(() => country_emojiSchema.extend({
  rest_countries_api_new_data: relatedrest_countries_api_new_dataSchema,
}))
