import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"

import ReminderSubmitButton from "./ReminderSubmitButton"


import ReminderDateField from "./ReminderDateField"
import ReminderMessageField from "./ReminderMessageField"

import { useReminderForm } from "~/providers/reminderFormProvider/useReminderForm"

export default function ReminderCreateModal() {
	const {
		modalIsOpen,
		submissionService: { closeAndResetFormFields },
	} = useReminderForm()

	return (
		<>
			<Dialog open={modalIsOpen} onClose={closeAndResetFormFields}>
				<DialogTitle align="center">Create Reminder</DialogTitle>
				<DialogContent>
					<ReminderMessageField />
					<ReminderDateField />
					{/* <ReminderChannelSelection /> */}
				</DialogContent>
				<DialogActions>
					<ReminderSubmitButton type="create" />
				</DialogActions>
			</Dialog>
		</>
	)
}
