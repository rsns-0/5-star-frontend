import { DataViewListItem } from "../components/reminders/DataViewListItem"

import { useGetAllReminders } from "../hooks/useReminderDatabaseService"

export default function Reminders() {
	const { data } = useGetAllReminders()
	return data?.map((res) => <DataViewListItem data={res} />)
	// return data && <ReminderDataView itemTemplate={DataViewListItem} data={data} />
}
