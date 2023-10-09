import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"
import { TextFieldElement } from "react-hook-form-mui"

export default function ReminderMessageField() {
	return (
		<TextFieldElement<ReminderUpdateFormData>
			name="reminder_message"
			label="Message"
			sx={{
				width: 400,
				maxHeight: 200,
			}}
			multiline
			FormHelperTextProps={{
				sx: { textOverflow: "ellipsis", maxWidth: "100%" },
			}}
			minRows={3}
			maxRows={3}
		/>
	)
}
