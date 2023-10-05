import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { remindersUpdateFormSchema } from "../models/reminder-frontend"

/**
 * Creates a form for editing reminders. Pass in the initial values for the form.
 */

export function useReminderForm(defaultValues: {
	reminder_message?: string
	time?: Date
	channel_id?: string
}) {
	return useForm({
		defaultValues,
		resolver: zodResolver(remindersUpdateFormSchema),
	})
}
