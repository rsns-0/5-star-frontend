import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"

import ReminderSubmitButton from "./ReminderSubmitButton"


import ReminderDateField from "./ReminderDateField"
import ReminderDeleteButton from "./ReminderDeleteButton"
import ReminderMessageField from "./ReminderMessageField"

import { useReminderForm } from "~/providers/reminderFormProvider/useReminderForm"
import ReminderChannelSelection from "./ReminderChannelSelection"

export default function ReminderEditModal() {
	const {
		modalIsOpen,
		submissionService: { closeAndSyncFormFieldsWithEntryInDatabase },
	} = useReminderForm()

	return (
		<>
			<Dialog open={modalIsOpen} onClose={closeAndSyncFormFieldsWithEntryInDatabase}>
				<DialogTitle align="center">Edit Reminder</DialogTitle>
				<DialogContent>
					<ReminderMessageField />
					<ReminderDateField />
					<ReminderChannelSelection />
				</DialogContent>
				<DialogActions>
					<ReminderSubmitButton type="update" />
					<ReminderDeleteButton />
				</DialogActions>
			</Dialog>
		</>
	)
}
