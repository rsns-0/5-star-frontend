import { ReminderCrudApp } from "../components/reminders/ReminderCrudApp"

import { api } from "../utils/api"

export default function Reminders() {
	const { data } = api.reminders.get.getAllReminders.useQuery()

	// return data && <ReminderDataView itemTemplate={DataViewListItem} data={data} />
}
