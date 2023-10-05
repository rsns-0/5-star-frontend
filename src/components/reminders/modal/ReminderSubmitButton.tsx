import { Button } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useReminderMutations } from "../../../hooks/useReminderDatabaseService"
import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"
import { useReminderDataContext } from "../../../contexts/reminderDataContext"

export default function ReminderSubmitButton() {
	const updateReminder = useReminderMutations().updateReminder
	const { id } = useReminderDataContext()

	const onSubmit = useFormContext<ReminderUpdateFormData>().handleSubmit((data) => {
		updateReminder.mutate({ ...data, id })
	})
	return (
		<Button type="button" onClick={onSubmit} variant="outlined">
			SUBMIT
		</Button>
	)
}
