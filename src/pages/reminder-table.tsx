import { Center, Loader } from "@mantine/core"
import { ReminderTable } from "../features/ReminderTable/ReminderTable"
import { api } from "../utils/api"
import { TitleText } from "../components/typography/TitleText"

export default function Page() {
	const { isLoading, isError, data } = api.reminderRouter.get.getAllReminders.useQuery()
	void api.useContext().discordRouter.getGuildsAndTextBasedChannelsOfUser.prefetch()

	if (isError) {
		throw new Error("Error fetching reminders")
	}

	if (isLoading)
		return (
			<Center>
				<Loader color="blue" />
			</Center>
		)

	return (
		<>
			<Center mb={"xl"}>
				<TitleText fz="2.5rem">Reminders</TitleText>
			</Center>
			<ReminderTable data={data} />
		</>
	)
}

