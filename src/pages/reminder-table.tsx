import { Center, Loader, Text } from "@mantine/core"
import { ReminderTable } from "../features/ReminderTable/ReminderTable"
import { api } from "../utils/api"
import { TitleText } from "../components/typography/TitleText"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Page() {
	const session = useSession()
	session.status === "unauthenticated"
	const { isLoading, isError, data } = api.reminderRouter.get.getAllReminders.useQuery()
	void api.useContext().discordRouter.getGuildsAndTextBasedChannelsOfUser.prefetch()

	if (session.status === "unauthenticated") {
		return (
			<Center>
				<Text fz="2rem">
					<Link href="/api/auth/signin">Please sign in.</Link>
				</Text>
			</Center>
		)
	}

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
