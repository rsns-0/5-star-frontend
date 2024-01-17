import * as z from "zod"

export const up_to_date_resolve_tie_dataSchema = z.object({
  id: z.number().int(),
  rest_countries_api_new_data_id: z.number().int().nullish(),
  languages_id: z.bigint().nullish(),
})
