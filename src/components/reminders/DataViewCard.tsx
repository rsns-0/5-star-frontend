import { Typography } from "@mui/material"
import { useContext } from "react"
import { reminderDataContext } from "../../contexts/reminderDataContext"

export function DataViewCard() {
	const data = useContext(reminderDataContext)!

	return (
		<Typography variant="h6" component="h6">
			{JSON.stringify(data)}
		</Typography>
	)
}
