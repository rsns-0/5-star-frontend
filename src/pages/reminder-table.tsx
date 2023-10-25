import { Center, Loader } from "@mantine/core"
import { ReminderTable } from "../features/ReminderTable/ReminderTable"
import { api } from "../utils/api"

/**
 * avoid waterfall but also maintain separate cache for each query since reminders will get invalidated often but not the channels https://tkdodo.eu/blog/seeding-the-query-cache#:~:text=A%20waterfall%20describes%20a%20situation,complete%20before%20firing%20another%20request.&text=In%20both%20variants%2C%20React%20Query,off%20data%20fetching%20in%20parallel.
 *
 * cannot use trpc with SSR, breaks NextAuth & other bugs https://github.com/trpc/trpc/issues/596
 *
 *
 */
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

	return <ReminderTable data={data} />
}

