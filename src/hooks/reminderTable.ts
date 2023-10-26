import { useCallback } from "react"
import { type GetFunctionArgument, type ReminderData } from "../types/types"
import { useReminderFormContext } from "./reminderForm"
import { tableStateModel } from "../models/TableStateModel"
import { notifications } from "@mantine/notifications"
import { useCreateReminder, useDeleteReminder, useUpdateReminder } from "./reminderCRUD"

export const useReminderFormModal = () => {
	const { getInputProps, errors, onSubmit: handleSubmit } = useReminderFormContext()

	const { mutate: updateMutation } = useUpdateReminder()

	const { mutate: createMutation } = useCreateReminder()

	const close = () => {
		tableStateModel.close()
	}

	const create = handleSubmit((data) => {
		close()
		createMutation(data)
		notifications.show({
			message: `Reminder ${JSON.stringify(data, null, 4)} created`,
		})
	})

	const update = handleSubmit((data) => {
		close()
		const id = tableStateModel.currentItemId
		if (!id) {
			throw new Error("Unexpected missing id")
		}
		updateMutation({ ...data, id })
		notifications.show({
			message: `Reminder ${JSON.stringify(data, null, 4)} updated`,
		})
	})

	const onSubmit = tableStateModel.isEditing ? update : create

	const register = (name: GetFunctionArgument<typeof getInputProps>) => {
		const props = getInputProps(name)

		return {
			...props,
			error: errors[name],
		}
	}

	return {
		isOpen: tableStateModel.isOpen,
		register,
		close,
		onSubmit,
		title: tableStateModel.title,
	}
}

export function useCancelReminderTableModal() {
	const close = () => {
		tableStateModel.close()
	}
	return close
}

export function useOpenReminderTableEditModal(data: ReminderData) {
	const { reset, setValues } = useReminderFormContext()

	const openEditModal = useCallback(() => {
		tableStateModel.openEdit(data.id)
		reset()
		setValues(data)
	}, [reset, setValues, data])
	return openEditModal
}

export function useOpenReminderTableCreateModal() {
	const { reset } = useReminderFormContext()

	const openCreateModal = useCallback(() => {
		tableStateModel.openCreate()
		reset()
	}, [reset])
	return openCreateModal
}

export function useDeleteItem(id: number) {
	const { mutate } = useDeleteReminder()

	return useCallback(() => {
		mutate(id)
		notifications.show({
			message: `Reminder ${id} deleted`,
		})
	}, [id, mutate])
}

