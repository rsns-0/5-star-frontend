import { Button } from "@mui/material"

import { FileDownload } from "@mui/icons-material"
import { useReminderForm } from "~/providers/reminderFormProvider/useReminderForm"

export default function ReminderSubmitButton({ type }: { type: "update" | "create" }) {
	const { getSubmitAction } = useReminderForm()
	const action = getSubmitAction(type)

	return (
		<Button type="button" onClick={action} startIcon={<FileDownload />} variant="outlined">
			SUBMIT
		</Button>
	)
}
