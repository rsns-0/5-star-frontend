import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"

import { useFormContext } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import {
	type GetReminderOutputNotNull,
	type GetGuildsAndTextBasedChannelsOfUserOutputSingle,
} from "../../types/router"
import { AutocompleteElement, DateTimePickerElement, TextFieldElement } from "react-hook-form-mui"
import { type ReminderUpdateFormData } from "../../models/reminder-frontend"
import { useGetChannels, useReminderMutations } from "../../hooks/useReminderDatabaseService"

import { useReminderDataContext } from "../../contexts/reminderDataContext"

import { useEffect, useMemo } from "react"
import DeleteButton from "../interactions/DeleteButton"
import SubmitButton from "../interactions/SubmitButton"
import LoadingBackdrop from "../loading/LoadingBackdrop"

const DevToolWrapper = () => {
	const { control } = useFormContext()
	return <DevTool control={control} placement="top-right" />
}

interface ReminderEditModalProps {
	type: "create" | "update"
	data: GetReminderOutputNotNull
	open: boolean
	onClose: () => void
}

export default function ReminderEditModal({ type, open, onClose, data }: ReminderEditModalProps) {
	useFormResetEffect(data, type)
	const { channels, findChannel } = useFindChannel()
	const { onCancel, onDelete, getSubmitAction, anyLoading } = useModalAction(onClose)
	const onSubmit = getSubmitAction(type)
	const groupBy = (opt: GetGuildsAndTextBasedChannelsOfUserOutputSingle) => {
		return findChannel(opt.id) ?? ""
	}

	const title = type === "create" ? "Create Reminder" : "Edit Reminder"

	return (
		<>
			<LoadingBackdrop open={anyLoading} />
			<Dialog open={open} onClose={onCancel}>
				<DialogTitle align="center">{title}</DialogTitle>
				<DialogContent>
					<TextFieldElement<ReminderUpdateFormData>
						name="reminder_message"
						label="Message"
						sx={{
							width: 400,
							maxHeight: 200,
						}}
						multiline
						FormHelperTextProps={{
							sx: { textOverflow: "ellipsis", maxWidth: "100%" },
						}}
						minRows={3}
						maxRows={3}
					/>
					<DateTimePickerElement<ReminderUpdateFormData>
						name="time"
						label="Time"
						sx={{
							maxHeight: 200,
							pb: 2,
						}}
					/>
					<AutocompleteElement<ReminderUpdateFormData>
						name="channel_id"
						label="Channels"
						options={channels ?? []}
						matchId
						autocompleteProps={{
							groupBy,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<SubmitButton onClick={onSubmit} />
					{type === "update" && <DeleteButton onDeleteAction={onDelete} />}
				</DialogActions>
			</Dialog>
			<DevToolWrapper />
		</>
	)
}

const useFindChannel = () => {
	const channels = useGetChannels()
	const findChannel = (id: string) => {
		return channels?.find((guild) => guild.id === id)?.guildName
	}
	return {
		channels,
		findChannel,
	}
}

function useModalAction(onClose: () => void) {
	const { deleteReminder, createReminder, updateReminder } = useReminderMutations()
	const { handleSubmit, reset } = useFormContext<ReminderUpdateFormData>()
	const { id } = useReminderDataContext()

	const statuses = useMemo(
		() => ({
			delete: deleteReminder.status,
			create: createReminder.status,
			update: updateReminder.status,
		}),
		[deleteReminder.status, createReminder.status, updateReminder.status]
	)

	const anyLoading = useMemo(
		() => Object.values(statuses).some((status) => status === "loading"),
		[statuses]
	)

	const onDelete = () => {
		onClose()
		deleteReminder.mutate(id)
	}

	const onEdit = handleSubmit((data: ReminderUpdateFormData) => {
		onClose()
		updateReminder.mutate({
			...data,
			id,
		})
	})

	const onCreate = handleSubmit((data: ReminderUpdateFormData) => {
		onClose()
		createReminder.mutate(data)
	})

	const onCancel = () => {
		onClose()
		reset()
	}

	const getSubmitAction = (type: "create" | "update") => {
		return type === "create" ? onCreate : onEdit
	}

	return {
		anyLoading,
		statuses,
		onDelete,
		onEdit,
		onCreate,
		onCancel,
		getSubmitAction,
	}
}

const useFormResetEffect = (
	{ reminder_message, time, channel_id }: GetReminderOutputNotNull,
	type: "update" | "create"
) => {
	const { reset } = useFormContext<ReminderUpdateFormData>()
	useEffect(() => {
		if (type === "create") {
			reset()
			return
		}
		reset({
			reminder_message,
			channel_id,
			time,
		})
	}, [channel_id, reminder_message, time, reset, type])
}
