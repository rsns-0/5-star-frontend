import { Button } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useReminderMutations } from "../../../hooks/useReminderDatabaseService"
import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"
import { useReminderDataContext } from "../../../contexts/reminderDataContext"


import { FileDownload } from "@mui/icons-material"
import { useSetAtom } from "jotai"
import { modalOpenAtom } from "../../../models/modalOpenAtom"

export default function ReminderSubmitButton() {
	const onSubmit = useReminderSubmit()
	return (
		<Button type="button" onClick={onSubmit} startIcon={<FileDownload />} variant="outlined">
			SUBMIT
		</Button>
	)
}

function useReminderSubmit() {
	const updateReminder = useReminderMutations().updateReminder
	const { id } = useReminderDataContext()
	const dispatch = useSetAtom(modalOpenAtom)

	return useFormContext<ReminderUpdateFormData>().handleSubmit((data) => {
		dispatch("CLOSE")
		updateReminder.mutate({ ...data, id })
	})
}