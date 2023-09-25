import {
	type IReminderFrontendData,
	reminderFrontendToBackendPipeline,
} from "./../models/reminder-frontend"
import { api } from "../utils/api"
import { remindersFrontEndSchemaCoerceArray } from "../models/reminder-frontend"

export const useReminder = () => {
	const utils = api.useContext()
	const query = api.reminders.getReminders.useQuery(undefined, {
		refetchOnWindowFocus: false,
	})
	const data = remindersFrontEndSchemaCoerceArray.parse(query.data)

	const exports = {
		createReminder: api.reminders.createReminder.useMutation({
			onSuccess() {
				void utils.reminders.getReminders.invalidate()
			},
		}).mutate,
		updateReminder(data: IReminderFrontendData) {
			const convertedData = reminderFrontendToBackendPipeline.parse(data)
			api.reminders.updateReminder
				.useMutation({
					onSuccess() {
						void utils.reminders.getReminders.invalidate()
					},
				})
				.mutate(convertedData)
		},
		deleteReminder: api.reminders.deleteReminder.useMutation({
			onSuccess() {
				void utils.reminders.getReminders.invalidate()
			},
		}).mutate,
		deleteReminders: api.reminders.deleteReminders.useMutation({
			onSuccess() {
				void utils.reminders.getReminders.invalidate()
			},
		}).mutate,
		// data: query.data?.map((d) => {
		// 	const time = DateTime.fromJSDate(d.time)

		// 	if (!time.isValid) {
		// 		throw new Error("invalid time")
		// 	}
		// 	return {
		// 		...d,
		// 		time,
		// 	}
		// }),
		data,
		refetch: query.refetch,
	}
	return exports
}
