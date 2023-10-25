import { type ICellRendererParams } from "ag-grid-community"
import { type ReminderData } from "../../types/types"
import { EditButton } from "../../components/buttons/EditButton"
import { DeleteButton } from "../../components/buttons/DeleteButton"
import { useDeleteItem, useOpenReminderTableEditModal } from "../../hooks/reminderTable"
import { observer } from "mobx-react"
import { notifications } from "@mantine/notifications"

const RowActionsRenderer = ({ data }: ICellRendererParams<ReminderData, string>) => {
	if (!data) {
		return <></>
	}

	return <RowActionsImpl data={data} />
}

const RowActionsImpl = ({ data }: { data: ReminderData }) => {
	const openEditModal = useOpenReminderTableEditModal()
	const deleteReminder = useDeleteItem(data.id)
	const handleDelete = () => {
		deleteReminder()
		notifications.show({
			message: `Reminder ${data.id} deleted`,
		})
	}

	return (
		<>
			<EditButton
				onClick={() => {
					openEditModal(data)
				}}
			/>{" "}
			<DeleteButton onClick={handleDelete} />
		</>
	)
}

export const RowActions = observer(RowActionsRenderer)
