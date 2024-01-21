import { Center, Loader } from "@mantine/core"
import { ReminderTable } from "../features/ReminderTable/ReminderTable"
import { api } from "../utils/api"
import { TitleText } from "../components/typography/TitleText"
import { useSession } from "next-auth/react"
import NotSignedInCard from "../components/card/NotSignedInCard"

export default function Page() {
	const session = useSession()

	if (session.status === "unauthenticated") {
		return (
			<Center h="80vh">
				<NotSignedInCard scale={1.5} />
			</Center>
		)
	}

	return (
		<>
			<Center mb={"xl"}>
				<TitleText fz="2.5rem">Reminders</TitleText>
			</Center>
			<ReminderTableComponent />
		</>
	)
}

const ReminderTableComponent = () => {
	const { isLoading, isError, data } = api.reminderRouter.get.getAllReminders.useQuery()
	void api.useContext().discordRouter.getGuildsAndTextBasedChannelsOfUser.prefetch()

	if (isError) {
		throw new Error("Error fetching reminders")
	}

	if (isLoading)
		return (
			<Center h="80vh">
				<Loader color="blue" />
			</Center>
		)

	return <ReminderTable data={data} />
}