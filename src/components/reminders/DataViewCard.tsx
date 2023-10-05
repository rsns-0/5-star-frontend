import { Typography } from "@mui/material"

import { type GetReminderOutput } from "../../types/router"

export function DataViewCard({ data }: { data: GetReminderOutput }) {
	return (
		<Typography variant="h6" component="h6">
			{JSON.stringify(data)}
		</Typography>
	)
}
