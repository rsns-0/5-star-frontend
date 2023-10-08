import { Button } from "@mui/material"

import { useReminderMutations } from "../../../hooks/useReminderDatabaseService"
import { useReminderDataContext } from "../../../contexts/reminderDataContext"



import { Delete } from "@mui/icons-material"
import { useSetAtom } from "jotai"
import { modalOpenAtom } from "../../../models/modalOpenAtom"

export default function ReminderDeleteButton() {
	const deleteReminderAction = useReminderDelete()

	return (
		<Button
			title="delete"
			onClick={deleteReminderAction}
			variant="outlined"
			color="error"
			startIcon={<Delete />}
		>
			Delete
		</Button>
	)
}

function useReminderDelete() {
	const reminderId = useReminderDataContext().id
	const dispatch = useSetAtom(modalOpenAtom)

	const { deleteReminder } = useReminderMutations()
	return () => {
		deleteReminder.mutate(reminderId)
		dispatch("CLOSE")
	}
}