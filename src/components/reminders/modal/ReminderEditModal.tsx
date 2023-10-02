import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { ReminderChannelSelection } from "./ReminderChannelSelection"
import { ReminderDateField } from "./ReminderDateField"
import { ReminderTextField } from "./ReminderTextField"
import { useReminderModalContext } from "~/contexts/reminderDataContext"
import { ReminderDeleteButton } from "./ReminderDeleteButton"
import { ReminderOpenModalButton } from "./ReminderOpenModalButton"
import ReminderSubmitButton from "./ReminderSubmitButton"

export default function ReminderEditModal() {
	const { dialogProps } = useReminderModalContext()

	return (
		<>
			<ReminderOpenModalButton />
			<Dialog {...dialogProps}>
				<DialogTitle align="center">Edit Reminder</DialogTitle>
				<DialogContent>
					<ReminderTextField />
					<ReminderDateField />
					<ReminderChannelSelection />
				</DialogContent>
				<DialogActions>
					<ReminderSubmitButton />
					<ReminderDeleteButton />
				</DialogActions>
			</Dialog>
		</>
	)
}
