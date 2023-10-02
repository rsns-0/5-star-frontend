import { DateTimePicker } from "@mui/x-date-pickers"
import { useReminderModalContext } from "~/contexts/reminderDataContext"

export function ReminderDateField() {
	const { timeField } = useReminderModalContext()
	return (
		<DateTimePicker
			{...timeField}
			label="Time"
			sx={{
				maxHeight: 200,
				pb: 2,
			}}
			inputRef={timeField.ref}
			defaultValue={timeField.value}
		/>
	)
}
