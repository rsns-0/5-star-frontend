import * as z from "zod"

export const deleted_webhooksSchema = z.object({
  db_id: z.number().int(),
  id: z.string().nullish(),
  created_at: z.date().nullish(),
  name: z.string().nullish(),
  url: z.string().nullish(),
  discord_channel_id: z.string().nullish(),
  token: z.string().nullish(),
})
