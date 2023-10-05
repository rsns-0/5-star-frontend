import { Button } from "@mui/material"
import { useReminderModalContext } from "../../../contexts/ReminderModalContext"
import { useReminderMutations } from "../../../hooks/useReminderDatabaseService"
import { useReminderDataContext } from "../../../contexts/reminderDataContext"

export default function ReminderDeleteButton() {
	const reminderId = useReminderDataContext().id
	const [, setOpen] = useReminderModalContext()

	const { deleteReminder } = useReminderMutations()
	const deleteReminderAction = () => {
		deleteReminder.mutate(reminderId)
		setOpen(false)
	}

	return (
		<Button title="delete" onClick={deleteReminderAction} variant="outlined" color="error">
			Delete
		</Button>
	)
}
