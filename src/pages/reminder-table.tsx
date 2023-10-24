import { Center, Loader } from "@mantine/core"
import { ReminderTable } from "../features/ReminderTable/ReminderTable"
import { api } from "../utils/api"

export default function Page() {
	const { data, isLoading, isError } = api.reminderRouter.get.getAllReminders.useQuery(undefined)

	if (isLoading)
		return (
			<Center>
				<Loader color="blue" />
			</Center>
		)

	if (isError) {
		throw new Error("Error fetching reminders")
	}

	return <ReminderTable data={data} />
}
