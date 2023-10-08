import { useSetFormValues } from "../../../hooks/useSetFormValues"
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"

import ReminderSubmitButton from "./ReminderSubmitButton"
import { type GetReminderOutputNotNull } from "../../../types/router"

import {
	ReminderDataContextProvider,
	useReminderDataContext,
} from "../../../contexts/reminderDataContext"

import ReminderChannelSelection from "./ReminderChannelSelection"
import ReminderDateField from "./ReminderDateField"
import ReminderDeleteButton from "./ReminderDeleteButton"
import ReminderMessageField from "./ReminderMessageField"
import { useFormContext } from "react-hook-form-mui"
import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"

import pick from "lodash/pick"

import { ReminderFormProvider } from "../../../providers/ReminderFormProvider"
import { useAtomValue, useSetAtom } from "jotai"
import { modalOpenAtom } from "../../../models/modalOpenAtom"

const formFields = ["channel_id", "reminder_message", "time"] as const

export default function ReminderEditModal({ data }: { data: GetReminderOutputNotNull }) {
	const defaultValues = pick(data, formFields)

	return (
		<>
			<ReminderDataContextProvider value={data}>
				<ReminderFormProvider defaultValues={defaultValues}>
					<ReminderDialog />
				</ReminderFormProvider>
			</ReminderDataContextProvider>
		</>
	)
}
function ReminderDialog() {
	const open = useAtomValue(modalOpenAtom)

	const handleClose = useCloseModalAndSyncForm()

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle align="center">Edit Reminder</DialogTitle>
			<DialogContent>
				<ReminderMessageField />
				<ReminderDateField />
				<ReminderChannelSelection />
			</DialogContent>
			<DialogActions>
				<ReminderSubmitButton />
				<ReminderDeleteButton />
			</DialogActions>
		</Dialog>
	)
}
/** Manages dialog open state and syncs form with new data on close. */
function useCloseModalAndSyncForm() {
	const dispatch = useSetAtom(modalOpenAtom)

	const values = pick(useReminderDataContext(), formFields)
	const syncForm = useSetFormValues(values, useFormContext<ReminderUpdateFormData>())

	return () => {
		syncForm()
		dispatch("CLOSE")
	}
}
