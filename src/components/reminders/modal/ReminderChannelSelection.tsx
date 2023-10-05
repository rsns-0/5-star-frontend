import { TextField, Autocomplete, Typography } from "@mui/material"

import useChannelSelection from "../../../hooks/useChannelSelection"

export default function ReminderChannelSelection({ label = "Channels" }) {
	const dropdownProps = useChannelSelection()

	return (
		<Autocomplete
			{...dropdownProps}
			renderGroup={(params) => {
				return <Typography>{params.group}</Typography>
			}}
			renderInput={(params) => {
				return <TextField {...params} label={label} />
			}}
		/>
	)
}
