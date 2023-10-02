import { TextField, Autocomplete, Typography } from "@mui/material"
import { useReminderModalContext } from "~/contexts/reminderDataContext"

export function ReminderChannelSelection() {
	const { dropdownProps } = useReminderModalContext()
	return (
		<Autocomplete
			{...dropdownProps}
			renderGroup={(params) => {
				return <Typography>{params.group}</Typography>
			}}
			renderInput={(params) => {
				return <TextField {...params} label="Channels" />
			}}
		/>
	)
}
