import { db2 } from "../db2"

interface ReminderInput {
	channel_id: string
	reminder_message: string
	time: Date
	userDiscordProviderId: string
}

export async function insertReminder({
	channel_id,
	reminder_message,
	time,
	userDiscordProviderId,
}: ReminderInput) {
	return db2
		.insertInto("reminders")
		.columns(["time", "reminder_message", "user_id", "channel_id", "webhook_id"])
		.expression((eb) =>
			eb
				.selectFrom("webhooks")
				.where("discord_channel_id", "=", channel_id)
				.select(({ val }) => [
					val(time.toISOString()).as("time"),
					val(reminder_message).as("reminder_message"),
					val(userDiscordProviderId).as("user_id"),
					val(channel_id).as("channel_id"),
					"webhooks.id as webhook_id",
				])
				.limit(1)
		)
		.returning("id")
		.executeTakeFirstOrThrow()
}
