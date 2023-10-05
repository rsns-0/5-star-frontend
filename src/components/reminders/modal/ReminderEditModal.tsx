import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

import ReminderSubmitButton from "./ReminderSubmitButton"
import { type GetReminderOutput } from "../../../types/router"

import { FormProvider } from "react-hook-form"
import { ReminderDataContextProvider } from "../../../contexts/reminderDataContext"
import {
	ReminderModalProvider,
	useInitializeReminderModalContext,
} from "../../../contexts/ReminderModalContext"
import { useReminderForm } from "../../../hooks/useReminderForm"
import ReminderChannelSelection from "./ReminderChannelSelection"
import ReminderDateField from "./ReminderDateField"
import ReminderDeleteButton from "./ReminderDeleteButton"
import ReminderMessageField from "./ReminderMessageField"

export default function ReminderEditModal({ data }: { data: GetReminderOutput }) {
	const modalState = useInitializeReminderModalContext()
	const [open, setOpen] = modalState
	const form = useReminderForm({
		channel_id: data?.discord_channels.id,
		reminder_message: data?.reminder_message,
		time: data?.time,
	})
	const handleClose = () => {
		form.reset()
		setOpen(false)
	}

	return (
		<>
			<FormProvider {...form}>
				<ReminderDataContextProvider value={data}>
					<ReminderModalProvider value={modalState}>
						<Button title="open" onClick={() => setOpen(true)}>
							Open
						</Button>
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
					</ReminderModalProvider>
				</ReminderDataContextProvider>
			</FormProvider>
		</>
	)
}
