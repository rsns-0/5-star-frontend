import { Button } from "@mui/material"
import { useReminderModalContext } from "~/contexts/reminderDataContext"

export function ReminderDeleteButton() {
	const { deleteReminderAction } = useReminderModalContext()
	return (
		<Button title="delete" onClick={deleteReminderAction} variant="outlined" color="error">
			Delete
		</Button>
	)
}
