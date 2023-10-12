import { Typography } from "@mui/material"

import { type GetReminderOutputNotNull } from "../../types/router"

export function DataViewCard({
	data,
	children,
}: {
	data: GetReminderOutputNotNull
	children: React.ReactNode
}) {
	return (
		<>
			<Typography variant="h6" component="h6">
				{JSON.stringify(data)}
			</Typography>
			{children}
		</>
	)
}

