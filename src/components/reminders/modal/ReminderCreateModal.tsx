import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"

import ReminderSubmitButton from "./ReminderSubmitButton"

import ReminderChannelSelection from "./ReminderChannelSelection"
import ReminderDateField from "./ReminderDateField"
import ReminderMessageField from "./ReminderMessageField"
import { useFormContext } from "react-hook-form-mui"
import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"

import { ReminderFormProvider } from "../../../providers/ReminderFormProvider"
import { type ParametersO } from "../../../types/types"
import { Provider, useAtomValue, useSetAtom } from "jotai"
import { modalOpenAtom } from "../../../models/modalOpenAtom"

export default function ReminderCreateModal() {
	const props: ParametersO<typeof ReminderFormProvider>["defaultValues"] = {
		time: new Date(),
		reminder_message: "",
		channel_id: "",
	}

	return (
		<>
			<ReminderFormProvider defaultValues={props}>
				<ReminderDialog />
			</ReminderFormProvider>
		</>
	)
}
function ReminderDialog() {
	const handleClose = useClose()
	const open = useAtomValue(modalOpenAtom)

	return (
		<Provider>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle align="center">Create Reminder</DialogTitle>
				<DialogContent>
					<ReminderMessageField />
					<ReminderDateField />
					<ReminderChannelSelection />
				</DialogContent>
				<DialogActions>
					<ReminderSubmitButton />
				</DialogActions>
			</Dialog>
		</Provider>
	)
}
/** Manages dialog open state and syncs form with new data on close. */
function useClose() {
	const { reset } = useFormContext<ReminderUpdateFormData>()
	const dispatch = useSetAtom(modalOpenAtom)

	return () => {
		reset()

		dispatch("CLOSE")
	}
}
