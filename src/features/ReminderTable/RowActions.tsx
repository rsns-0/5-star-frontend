import { type ICellRendererParams } from "ag-grid-community"
import { type ReminderData } from "../../types/types"
import { EditButton } from "../../components/buttons/EditButton"
import { DeleteButton } from "../../components/buttons/DeleteButton"
import { useDeleteItem, useOpenReminderTableEditModal } from "../../hooks/reminderTable"
import { observer } from "mobx-react"

const RowActionsRenderer = ({ data }: ICellRendererParams<ReminderData, string>) => {
	if (!data) {
		return
	}

	return <RowActionsImpl data={data} />
}

const RowActionsImpl = ({ data }: { data: ReminderData }) => {
	const { handleDelete, openEditModal } = useRowActions(data)

	return (
		<>
			<EditButton data-testid={`${data.id}-edit`} onClick={openEditModal} />
			<DeleteButton data-testid={`${data.id}-delete`} onClick={handleDelete} />
		</>
	)
}

const useRowActions = (data: ReminderData) => {
	const openEditModal = useOpenReminderTableEditModal(data)

	const handleDelete = useDeleteItem(data.id)

	return {
		openEditModal,
		handleDelete,
	}
}

export const RowActions = observer(RowActionsRenderer)
