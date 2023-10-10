import { DataViewListItem } from "../components/reminders/DataViewListItem"
import ReminderDataView from "../components/reminders/ReminderDataView"

import { api } from "../utils/api"

export default function Reminders() {
	const { data } = api.reminders.get.getAllReminders.useQuery()
	return data?.map((res) => <DataViewListItem key={res.id} data={res} />)
	// return data && <ReminderDataView itemTemplate={DataViewListItem} data={data} />
}
