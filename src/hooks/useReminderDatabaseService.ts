import { api } from "../utils/api"

const refetchOnWindowFocus = false

export const useReminderMutations = () => {
	const utils = api.useContext()

	const onSuccess = () => {
		void utils.reminders.invalidate()
	}

	return {
		createReminder: api.reminders.post.createReminder.useMutation({
			onSuccess,
		}),
		updateReminder: api.reminders.patch.updateReminder.useMutation({
			onSuccess,
		}),
		deleteReminder: api.reminders.delete.deleteReminder.useMutation({
			onSuccess,
		}),
		deleteReminders: api.reminders.delete.deleteReminders.useMutation({
			onSuccess,
		}),
	}
}

export function useGetChannels() {
	return api.discordRouter.getGuildsAndTextBasedChannelsOfUser.useQuery(undefined, {
		refetchOnWindowFocus,
		initialData: [],
	}).data
}

export function useGetReminders(id: number[]) {
	return api.reminders.get.getReminders.useQuery(id, {
		refetchOnWindowFocus,
	})
}

export function useGetReminder(id: number) {
	return api.reminders.get.getReminder.useQuery(id, {
		refetchOnWindowFocus,
	})
}

export function useGetReminderFormDefaults(id: number) {
	return useGetReminder(id)
}