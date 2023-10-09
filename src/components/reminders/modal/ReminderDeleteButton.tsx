import { Button } from "@mui/material"




import { Delete } from "@mui/icons-material"
import { useReminderForm } from "~/providers/reminderFormProvider/useReminderForm"

export default function ReminderDeleteButton() {
	const { closeAndDeleteEntryInDatabase } = useReminderForm()

	return (
		<Button
			title="delete"
			onClick={closeAndDeleteEntryInDatabase}
			variant="outlined"
			color="error"
			startIcon={<Delete />}
		>
			Delete
		</Button>
	)
}
