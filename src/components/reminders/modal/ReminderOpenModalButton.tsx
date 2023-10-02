import { Button } from "@mui/material"
import { useReminderModalContext } from "~/contexts/reminderDataContext"

export function ReminderOpenModalButton() {
	const { openModal } = useReminderModalContext()
	return (
		<Button title="open" onClick={openModal}>
			Open
		</Button>
	)
}
