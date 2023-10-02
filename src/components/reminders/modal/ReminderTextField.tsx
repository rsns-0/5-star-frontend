import { TextField } from "@mui/material"
import { useReminderModalContext } from "~/contexts/reminderDataContext"

export function ReminderTextField() {
	const { textFieldControllerProps, isErrored, reminderMessageErrors } = useReminderModalContext()

	return (
		<TextField
			{...textFieldControllerProps}
			label="Message"
			sx={{
				width: 400,
				maxHeight: 200,
			}}
			multiline
			FormHelperTextProps={{
				sx: { textOverflow: "ellipsis", maxWidth: "100%" },
			}}
			onChange={textFieldControllerProps.onChange}
			minRows={3}
			maxRows={3}
			error={isErrored}
			helperText={reminderMessageErrors ?? " "}
		/>
	)
}
