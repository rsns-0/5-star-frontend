import { DataViewListItem } from "../../components/reminders/DataViewListItem"

import { Typography } from "@mui/material"
import { api } from "../../utils/api"

export default function DataViewListItemTest() {
	const { data, isSuccess } = api.reminders.get.getAllReminders.useQuery()
	const first = data?.[0]

	if (!isSuccess) {
		return <Typography>Loading...</Typography>
	}
	if (!first) {
		return <Typography>No data</Typography>
	}

	return (
		<>
			<DataViewListItem data={first} />
		</>
	)
}
