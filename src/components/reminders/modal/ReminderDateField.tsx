import { DateTimePicker } from "@mui/x-date-pickers"

import { useController } from "react-hook-form"
import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"

export default function ReminderDateField() {
	const { field } = useController<ReminderUpdateFormData>({
		name: "time",
	})

	return (
		<DateTimePicker
			label="Time"
			sx={{
				maxHeight: 200,
				pb: 2,
			}}
			{...field}
		/>
	)
}
