import { type ICellRendererParams } from "ag-grid-community"
import { type ReminderData } from "../../types/types"
import { EditButton } from "../../components/buttons/EditButton"
import { DeleteButton } from "../../components/buttons/DeleteButton"
import { useTableActions } from "../../hooks/reminderTable"
import { observer } from "mobx-react"

const RowActionsRenderer = ({ data }: ICellRendererParams<ReminderData, string>) => {
	if (!data) {
		return
	}

	return <_RowActions data={data} />
}

const _RowActions = observer(({ data }: { data: ReminderData }) => {
	const { openEditModal, deleteItem } = useTableActions(data)

	return (
		<>
			<EditButton data-testid={`${data.id}-edit`} onClick={openEditModal} />
			<DeleteButton data-testid={`${data.id}-delete`} onClick={deleteItem} />
		</>
	)
})


export const RowActions = observer(RowActionsRenderer)
