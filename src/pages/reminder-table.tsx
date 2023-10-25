import { Center, Loader } from "@mantine/core"
import { ReminderTable } from "../features/ReminderTable/ReminderTable"
import { api } from "../utils/api"
import { ChannelProvider } from "../providers/ChannelsProvider"

/**
 * avoid waterfall but also maintain separate cache for each query since reminders will get invalidated often but not the channels https://tkdodo.eu/blog/seeding-the-query-cache#:~:text=A%20waterfall%20describes%20a%20situation,complete%20before%20firing%20another%20request.&text=In%20both%20variants%2C%20React%20Query,off%20data%20fetching%20in%20parallel.
 *
 * cannot use trpc with SSR, breaks NextAuth & other bugs https://github.com/trpc/trpc/issues/596
 *
 *
 */
export default function Page() {
	const result1 = api.reminderRouter.get.getAllReminders.useQuery()
	const result2 = api.discordRouter.getGuildsAndTextBasedChannelsOfUser.useQuery()

	if (result1.isError) {
		throw new Error("Error fetching reminders")
	}
	if (result2.isError) {
		throw new Error("Error fetching channels")
	}
	if (result1.isLoading || result2.isLoading)
		return (
			<Center>
				<Loader color="blue" />
			</Center>
		)

	return (
		<ChannelProvider value={result2.data}>
			<ReminderTable data={result1.data} />
		</ChannelProvider>
	)
}

