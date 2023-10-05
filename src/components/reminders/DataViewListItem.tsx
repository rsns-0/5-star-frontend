import { type GetReminderOutput } from "../../types/router"

import ReminderEditModal from "./modal/ReminderEditModal"
import { DataViewCard } from "./DataViewCard"

export function DataViewListItem({ data }: { data: GetReminderOutput }) {
	return (
		<>
			<div className="col-12 gap-4">
				<DataViewCard data={data} />
				<ReminderEditModal data={data} />
			</div>
		</>
	)
}
