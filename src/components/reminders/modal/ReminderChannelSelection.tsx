import { TextField, Autocomplete } from "@mui/material"

import useChannelSelection from "../../../hooks/useChannelSelection"
import { useReminderDataContext } from "../../../contexts/reminderDataContext"

export default function ReminderChannelSelection({ label = "Channels" }) {
	const {
		discord_channels: { id },
	} = useReminderDataContext()
	const dropdownProps = useChannelSelection(id)

	return (
		<Autocomplete
			{...dropdownProps}
			renderInput={(params) => {
				return <TextField {...params} label={label} />
			}}
		/>
	)
}
