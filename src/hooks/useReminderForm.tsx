import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createDefaultReminderFieldValues } from "../lib/createDefaultReminderFieldValues"
import { type ReminderUpdateFormData, remindersUpdateFormSchema } from "../models/reminder-frontend"

export const reminderFormConfigs = {
	resolver: zodResolver(remindersUpdateFormSchema),
	defaultValues: createDefaultReminderFieldValues(),
}

export const useReminderForm = () => {
	const formMethods = useForm<ReminderUpdateFormData>(reminderFormConfigs)

	return formMethods
}
