import { DateTimePicker } from "@mui/x-date-pickers"

import { useController } from "react-hook-form"
import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"

export default function ReminderDateField() {
	const controller = useController<ReminderUpdateFormData>({
		name: "time",
	})
	const { field } = controller

	return (
		<DateTimePicker
			label="Time"
			sx={{
				maxHeight: 200,
				pb: 2,
			}}
			inputRef={field.ref}
			defaultValue={field.value}
			onChange={field.onChange}
		/>
	)
}
