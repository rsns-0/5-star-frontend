export function createDefaultReminderFieldValues() {
	return {
		time: new Date(),
		reminder_message: "",
		channel_id: "",
		guild_id: "",
	}
}
