import * as z from "zod"
import { Completereminders, relatedremindersSchema, Completediscord_channels, relateddiscord_channelsSchema } from "./index"

export const webhooksSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  name: z.string(),
  url: z.string(),
  discord_channel_id: z.string(),
  token: z.string().nullish(),
})

export interface Completewebhooks extends z.infer<typeof webhooksSchema> {
  reminders: Completereminders[]
  discord_channels: Completediscord_channels
}

/**
 * relatedwebhooksSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedwebhooksSchema: z.ZodSchema<Completewebhooks> = z.lazy(() => webhooksSchema.extend({
  reminders: relatedremindersSchema.array(),
  discord_channels: relateddiscord_channelsSchema,
}))
