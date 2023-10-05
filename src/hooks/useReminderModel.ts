import { useReminderMutations } from "./useReminderDatabaseService"

export const useReminderModel = () => {
	const { data: reminderData, ...rest } = useReminderMutations()

	return {
		...rest,

		reminderData,
	}
}
