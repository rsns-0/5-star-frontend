import { type RouterOutputs } from "../utils/api"

export type GetGuildsAndTextBasedChannelsOfUserOutput =
	RouterOutputs["discordRouter"]["getGuildsAndTextBasedChannelsOfUser"]
export type GetReminderOutput = NonNullable<RouterOutputs["reminders"]["get"]["getReminder"]> | null
