import { type GetReminderOutputNotNull } from "../../types/router"

import ReminderEditModal from "./modal/ReminderEditModal"
import { DataViewCard } from "./DataViewCard"


import ReminderCreateModal from "./modal/ReminderCreateModal"

import { ReminderDialogFormProvider } from "../../providers/reminderFormProvider/ReminderFormProvider"
import { createDefaultReminderFieldValues } from "~/providers/reminderFormProvider/createDefaultReminderFieldValues"
import { useReminderForm } from "~/providers/reminderFormProvider/useReminderForm"

import { AddCircle, ModeEdit } from "@mui/icons-material"
import { Button } from "@mui/material"

const OpenButtonForCreate = withModalOpen(Button)
const OpenButtonForEdit = withModalOpen(Button)

export function DataViewListItem({ data }: { data: GetReminderOutputNotNull }) {
	const filledValues = createDefaultReminderFieldValues(data)

	return (
		<>
			<div className="col-12 gap-4">
				<DataViewCard data={data}>
					<ReminderDialogFormProvider data={data}>
						<OpenButtonForCreate
							variant="outlined"
							title="CREATE"
							name="CREATE"
							startIcon={<AddCircle />}
						>
							CREATE
						</OpenButtonForCreate>
						<ReminderCreateModal />
					</ReminderDialogFormProvider>
					<ReminderDialogFormProvider defaultValues={filledValues} data={data}>
						<OpenButtonForEdit
							variant="outlined"
							title="EDIT"
							name="EDIT"
							startIcon={<ModeEdit />}
						>
							EDIT
						</OpenButtonForEdit>
						<ReminderEditModal />
					</ReminderDialogFormProvider>
				</DataViewCard>
			</div>
		</>
	)
}

function withModalOpen<T>(WrappedButton: React.ComponentType<T>) {
	function WithModalOpen(props: T) {
		const { openModal } = useReminderForm()
		return <WrappedButton onClick={openModal} {...props} />
	}
	return WithModalOpen
}

