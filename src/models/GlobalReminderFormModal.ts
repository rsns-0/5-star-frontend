import { atom, useAtom } from "jotai"
import { type ReminderData } from "../types/types"
import { useReminderFormContext } from "../hooks/reminderForm"
import { useCallback } from "react"

const reminderModalOpenStateAtom = atom(false)

export const useGlobalReminderFormModal = () => {
	const [isOpen, setIsOpen] = useAtom(reminderModalOpenStateAtom)
	const { reset, handleSubmit } = useReminderFormContext()

	const openEditModal = useCallback(
		(data: ReminderData) => {
			setIsOpen(true)
			reset(data)
		},
		[reset, setIsOpen]
	)

	const submit = handleSubmit((data) => {
		console.log(data)
	})

	const openCreateModal = useCallback(() => {
		setIsOpen(true)
		reset()
	}, [reset, setIsOpen])

	const open = () => {
		setIsOpen(true)
	}

	const close = () => {
		setIsOpen(false)
	}

	return {
		isOpen,
		openEditModal,
		openCreateModal,
		open,
		close,
		submit,
	}
}
