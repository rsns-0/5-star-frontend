import * as z from "zod"

export const deleted_discord_user_to_guildsSchema = z.object({
  id: z.number().int(),
  created_at: z.date(),
  discord_user_id: z.string(),
  discord_guild_id: z.string(),
})
