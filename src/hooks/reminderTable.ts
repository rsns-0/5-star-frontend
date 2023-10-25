import { useCallback } from "react"
import { type ChannelData, type GetFunctionArgument, type ReminderData } from "../types/types"
import { useReminderFormContext } from "./reminderForm"
import { tableStateModel } from "../models/TableStateModel"
import { type ComboboxData } from "@mantine/core"
import { useChannelContext } from "../providers/ChannelsProvider"
import { notifications } from "@mantine/notifications"

export const useReminderFormModal = () => {
	const { getInputProps, errors, onSubmit: handleSubmit } = useReminderFormContext()

	const close = () => {
		tableStateModel.close()
	}

	const create = handleSubmit((data) => {
		close()
		notifications.show({
			message: `Reminder ${JSON.stringify(data, null, 4)} created`,
		})
	})

	const update = handleSubmit((data) => {
		close()
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

class ChannelDataTransformer {
	constructor(public data: ChannelData) {}

	public transformMantineComboboxData() {
		return this.data.map((guild) => ({
			group: guild.name,
			items: guild.discord_channels.map((channel) => ({
				value: channel.id,
				label: channel.name,
			})),
		})) satisfies ComboboxData
	}
}

export function useGetChannels() {
	return new ChannelDataTransformer(useChannelContext()).transformMantineComboboxData()
}

export function useCancelReminderTableModal() {
	const close = () => {
		tableStateModel.close()
	}
	return close
}

export function useOpenReminderTableEditModal() {
	const { reset, setValues } = useReminderFormContext()

	const openEditModal = useCallback(
		(data: ReminderData) => {
			tableStateModel.openEdit(data.id)
			reset()
			setValues(data)
		},
		[reset, setValues]
	)
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
	return useCallback(() => {
		console.log(`delete ${id}`)
	}, [id])
}
