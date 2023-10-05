import { TextField } from "@mui/material"
import { useController } from "react-hook-form"

import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"

export default function ReminderMessageField() {
	const control = useController<ReminderUpdateFormData>({ name: "reminder_message" })

	return (
		<TextField
			label="Message"
			sx={{
				width: 400,
				maxHeight: 200,
			}}
			multiline
			FormHelperTextProps={{
				sx: { textOverflow: "ellipsis", maxWidth: "100%" },
			}}
			onChange={control.field.onChange}
			value={control.field.value}
			minRows={3}
			maxRows={3}
			error={control.fieldState.error !== undefined}
			helperText={control.fieldState.error?.message ?? " "}
		/>
	)
}
