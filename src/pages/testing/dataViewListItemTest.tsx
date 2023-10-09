import { DataViewListItem } from "../../components/reminders/DataViewListItem"

import { Typography } from "@mui/material"
import { api } from "../../utils/api"

export default function DataViewListItemTest() {
	const { data, isSuccess } = api.reminders.get.getAllReminders.useQuery()

	if (!isSuccess) {
		return <Typography>Loading...</Typography>
	}
	if (!data?.[0]) {
		return <Typography>No data</Typography>
	}

	return (
		<>
			<DataViewListItem data={data[0]} />
		</>
	)
}
