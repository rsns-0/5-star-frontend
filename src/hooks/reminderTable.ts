import { useCallback } from "react"
import { type GetFunctionArgument, type ReminderData } from "../types/types"
import { useReminderFormContext } from "./reminderForm"
import { tableStateModel } from "../models/TableStateModel"
import { notifications } from "@mantine/notifications"
import { useCreateReminder, useDeleteReminder, useUpdateReminder } from "./reminderCRUD"
import { useChannels } from "./getChannels"

export const useReminderFormModal = () => {
	const {
		getInputProps,
		errors,
		onSubmit: handleSubmit,
		values,
		setFieldValue,
	} = useReminderFormContext()

	const { mutate: updateMutation } = useUpdateReminder()

	const { mutate: createMutation } = useCreateReminder()

	const close = () => {
		tableStateModel.close()
	}

	const create = handleSubmit((data) => {
		close()
		createMutation(data)
		notifications.show({
			message: `Reminder ${data.reminder_message} created`,
		})
	})

	const update = handleSubmit((data) => {
		const id = tableStateModel.currentItemId
		if (!id) {
			throw new Error("Unexpected missing id")
		}
		updateMutation({ ...data, id })
		notifications.show({
			message: `Reminder ${data.reminder_message} updated`,
		})
		close()
	})

	const onSubmit = tableStateModel.isEditing ? update : create

	const register = (name: GetFunctionArgument<typeof getInputProps>) => {
		return {
			...getInputProps(name),
			error: errors[name],
		}
	}

	return {
		isOpen: tableStateModel.isOpen,
		register,
		close,
		onSubmit,
		title: tableStateModel.title,
		values,
		setFieldValue,
	}
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
	const { setValues, reset } = useReminderFormContext()

	const { getChannels, guilds } = useChannels()

	const openCreateModal = useCallback(() => {
		reset()
		const guild_id = guilds[0]?.value ?? ""
		const channel_id = getChannels(guild_id)[0]?.value
		setValues({
			guild_id,
			channel_id,
			time: new Date(),
		})
		tableStateModel.openCreate()
	}, [setValues, getChannels, guilds, reset])
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

export function useTableActions(data: ReminderData) {
	const { reset, setValues } = useReminderFormContext()
	const { mutate } = useDeleteReminder()

	const openEditModal = useCallback(() => {
		tableStateModel.openEdit(data.id)
		reset()
		setValues(data)
	}, [reset, setValues, data])

	const deleteItem = useCallback(() => {
		mutate(data.id)
		notifications.show({
			message: `Reminder ${data.id} deleted`,
		})
	}, [data.id, mutate])

	return {
		openEditModal,
		deleteItem,
	}
}
