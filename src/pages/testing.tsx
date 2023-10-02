import { DataViewListItem } from "../components/reminders/DataViewListItem"

import { type GetRemindersOutput } from "../types/router"
import { useReminderModel } from "../hooks/useReminderModel"
import { Typography } from "@mui/material"

export default function Testing() {
	const mockData: GetRemindersOutput = {
		channel_name: "libraries",
		guild_name: "5-star-tasker",
		id: 303,
		created_at: new Date("2022-01-01T00:00:00Z"),
		user_id: "1234567890",
		channel_id: "1141063217716662332",
		reminder_message: "Reminder message 123 asd",
		webhook_id: "1234567890",
		time: new Date("2022-01-02T00:00:00Z"),
	}
	const realData = useReminderModel().reminderData
	const maybeData = realData?.find((obj) => obj.id === 279)
	mockData

	if (!maybeData) {
		return <Typography>Loading...</Typography>
	}

	return (
		<>
			<DataViewListItem data={maybeData} />
		</>
	)
}
