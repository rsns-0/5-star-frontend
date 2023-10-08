import { DataViewListItem } from "../../components/reminders/DataViewListItem"

import { Typography } from "@mui/material"
import { api } from "../../utils/api"

export default function DataViewListItemTest() {
	const { data, isSuccess } = api.reminders.get.getReminder.useQuery(290)

	if (!isSuccess) {
		return <Typography>Loading...</Typography>
	}
	if (!data) {
		return <Typography>No data</Typography>
	}

	return (
		<>
			<DataViewListItem data={data} />
		</>
	)
}
