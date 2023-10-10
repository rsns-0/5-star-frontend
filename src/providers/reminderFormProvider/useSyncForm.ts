import { createDefaultReminderFieldValues } from "./createDefaultReminderFieldValues"

import { useFormContext } from "react-hook-form"

import { useSetFormValues } from "../../hooks/useSetFormValues"
import { type ReminderUpdateFormData } from "../../models/reminder-frontend"
import { useReminderDataContext } from "../../contexts/reminderDataContext"

export function useSyncForm() {
	const form = useFormContext<ReminderUpdateFormData>()
	const data = useReminderDataContext()
	return useSetFormValues(createDefaultReminderFieldValues(data), form)
}
