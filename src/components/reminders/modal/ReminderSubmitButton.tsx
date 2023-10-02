import { Button } from "@mui/material"

import { useReminderModalContext } from "~/contexts/reminderDataContext"

export default function ReminderSubmitButton() {
	const { onSubmit } = useReminderModalContext()
	return (
		<Button type="button" onClick={onSubmit} variant="outlined">
			SUBMIT
		</Button>
	)
}
