import { notifications } from "@mantine/notifications"
import { api } from "../utils/api"

export const useCreateReminder = () => {
	const utils = api.useContext()
	return api.reminderRouter.post.createReminder.useMutation({
		onSettled() {
			void utils.reminderRouter.get.invalidate()
		},
	})
}

export const useDeleteReminder = () => {
	const utils = api.useContext()
	return api.reminderRouter.delete.deleteReminder.useMutation({
		onMutate(id) {
			utils.reminderRouter.get.getAllReminders.setData(undefined, (prev) => {
				return prev?.filter((reminder) => reminder.id !== id) ?? []
			})
		},
		onSettled(item) {
			if (item instanceof Error) {
				showErrorMessage(item.message)
			}
			void utils.reminderRouter.get.invalidate()
		},
	})
}

export const useUpdateReminder = () => {
	const utils = api.useContext()

	return api.reminderRouter.patch.updateReminder.useMutation({
		onMutate(item) {
			utils.reminderRouter.get.getAllReminders.setData(undefined, (prev) => {
				if (!prev) {
					return []
				}
				return prev.map((reminder) => {
					if (reminder.id === item.id) {
						return { ...reminder, ...item }
					}
					return reminder
				})
			})
		},
		onSettled(item) {
			if (item instanceof Error) {
				showErrorMessage(item.message)
			}
			void utils.reminderRouter.get.invalidate()
		},
	})
}

function showErrorMessage(message: string) {
	notifications.show({
		title: "Error",
		message,
		color: "red",
	})
}
