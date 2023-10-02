import { api } from "../utils/api"

export const useReminderDatabaseService = () => {
	const utils = api.useContext()
	const query = api.reminders.getReminders.useQuery(undefined, {
		refetchOnWindowFocus: false,
	})

	const channels = api.discordRouter.getGuildsAndTextBasedChannelsOfUser.useQuery(undefined, {
		refetchOnWindowFocus: false,
		initialData: [],
	}).data

	const onSuccess = () => {
		void utils.reminders.getReminders.invalidate()
	}

	return {
		createReminder: api.reminders.createReminder.useMutation({
			onSuccess,
		}).mutate,
		updateReminder: api.reminders.updateReminder.useMutation({
			onSuccess,
		}).mutate,
		deleteReminder: api.reminders.deleteReminder.useMutation({
			onSuccess,
		}).mutate,
		deleteReminders: api.reminders.deleteReminders.useMutation({
			onSuccess,
		}).mutate,
		channels,

		data: query.data,
	}
}
