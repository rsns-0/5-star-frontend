import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from "@mui/material"

import { type BaseSyntheticEvent } from "react"

import { useForm } from "react-hook-form"
import { type IPartialReminderData } from "../../types/reminder"

type CreateModalProps = {
	onClose: () => void
	onSubmit: (values: IPartialReminderData) => void
	open: boolean
}

export const CreateReminderFormModal = ({ open, onClose, onSubmit }: CreateModalProps) => {
	const { register, handleSubmit } = useForm<IPartialReminderData>({
		defaultValues: {
			time: new Date(),
			message: "",
		},
	})

	const handleSubmitImpl = (data: IPartialReminderData, e: BaseSyntheticEvent | undefined) => {
		e?.preventDefault()
		onSubmit(data)
		onClose()
	}

	return (
		<Dialog open={open}>
			<DialogTitle textAlign="center">Create Reminder</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(handleSubmitImpl)}>
					<Stack direction={"column"} spacing={2} alignItems="center">
						<TextField
							label="Time"
							InputLabelProps={{ shrink: true }}
							type="datetime-local"
							{...register("time", { required: "Time is required" })}
						/>
						<TextField
							label="Message"
							type="text"
							InputLabelProps={{ shrink: true }}
							{...register("message", { required: "Message is required" })}
						/>
						<DialogActions sx={{ p: "1.25rem" }}>
							<Button type="submit" variant="contained">
								Submit
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</DialogActions>
					</Stack>
				</form>
			</DialogContent>
		</Dialog>
	)
}
