import { type GetReminderOutputNotNull } from "../../types/router"

import ReminderEditModal from "./modal/ReminderEditModal"
import { DataViewCard } from "./DataViewCard"

import EditButton from "../interactions/EditButton"
import { useSetAtom } from "jotai"
import { modalOpenAtom } from "../../models/modalOpenAtom"

export function DataViewListItem({ data }: { data: GetReminderOutputNotNull }) {
	const dispatch = useSetAtom(modalOpenAtom)

	return (
		<>
			<div className="col-12 gap-4">
				<DataViewCard data={data} />
				<EditButton onClick={() => dispatch("OPEN")} />
				<ReminderEditModal data={data} />
			</div>
		</>
	)
}
