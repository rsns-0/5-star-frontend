import { time } from "console"
import { createContext, useContext, useState } from "react"
import { useForm, useController } from "react-hook-form"
import { useReminderModel } from "../hooks/useReminderModel"
import { remindersUpdateFormSchema } from "../models/reminder-frontend"
import { type GetRemindersOutput } from "../types/router"
import { type DataContext } from "../types/types"

import { zodResolver } from "@hookform/resolvers/zod"

export const reminderDataContext = createContext<DataContext>(null)

export const useReminderDataContext = () => {
	const ctx = useContext(reminderDataContext)
	if (!ctx) {
		throw new Error("useReminderDataContext must be used within a ReminderDataProvider")
	}
	return ctx
}

export function useReminderModalContextConstructor(data: GetRemindersOutput) {
	const { reminder_message } = data
	const form = useForm({
		defaultValues: {
			reminder_message,
			time,
		},
		resolver: zodResolver(remindersUpdateFormSchema),
	})
	const { control } = form
	const reminderMessageTextFieldController = useController({ control, name: "reminder_message" })
	const timeController = useController({ control, name: "time" })
	const [open, setOpen] = useState(false)
	const dialogStateManager = {
		open,
		setOpen,
	}
	return {
		timeController,
		dialogStateManager,
		reminderMessageTextFieldController,
		form,
	}
}
export function useReminderModalContext() {
	const { reminder_message, time, id, channel_id, open, setOpen } =
		useContext(reminderDataContext)!
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			reminder_message,
			time,
		},
		resolver: zodResolver(remindersUpdateFormSchema),
	})
	const {
		field: { ref, value, ...rest },
	} = useController({ control, name: "reminder_message" })
	const { field: timeField } = useController({ control, name: "time" })
	const { updateReminder, deleteReminder, getDropdownPropsWithInitialValue } = useReminderModel()

	function closeModal() {
		setOpen(false)
	}

	return {
		deleteReminderAction: () => {
			deleteReminder(id)
			closeModal()
		},
		reminderMessageErrors: errors.reminder_message?.message,

		textFieldControllerProps: {
			inputRef: ref,
			defaultValue: value,
			...rest,
		},
		timeField,
		isErrored: errors.reminder_message !== undefined,
		dialogProps: { open, onClose: closeModal },
		openModal: () => {
			console.log("opened")
			console.log(open)
			setOpen(true)
		},
		dropdownProps: getDropdownPropsWithInitialValue(channel_id),
		onSubmit: handleSubmit((e) => {
			console.log(e)
			updateReminder({ ...e, id, channel_id })
			closeModal()
		}),
		cancelModal: () => {
			reset()
			closeModal()
		},
	}
}
