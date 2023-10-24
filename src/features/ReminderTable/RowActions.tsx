import { type ICellRendererParams } from "ag-grid-community"
import { type ReminderRowItem } from "../../types/types"
import { EditButton } from "../../components/buttons/EditButton"
import { DeleteButton } from "../../components/buttons/DeleteButton"
import { memo } from "react"
import { useGlobalReminderFormModal } from "../../models/GlobalReminderFormModal"

const RowActionsRenderer = ({ data }: ICellRendererParams<ReminderRowItem, string>) => {
	if (!data) {
		return <></>
	}

	return <RowActionsImpl data={data} />
}

const RowActionsImpl = ({ data: { actions: _, ...data } }: { data: ReminderRowItem }) => {
	const { openEditModal } = useGlobalReminderFormModal()

	return (
		<>
			<EditButton
				onClick={() => {
					openEditModal(data)
				}}
			/>{" "}
			<DeleteButton
				onClick={() => {
					console.log(`Deleted ${JSON.stringify(data)}`)
				}}
			/>
		</>
	)
}

export const RowActions = memo(RowActionsRenderer)
