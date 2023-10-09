import { useSyncForm } from "./useSyncForm"

import { useSetAtom } from "jotai"
import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { useReminderDataContext } from "../../contexts/reminderDataContext"
import { useReminderMutations } from "../../hooks/useReminderDatabaseService"
import { modalOpenAtom } from "../../models/modalOpenAtom"
import { type ReminderUpdateFormData } from "../../models/reminder-frontend"

export function useReminderSubmissionService() {
	//* initialize dependencies
	const form = useFormContext<ReminderUpdateFormData>()
	const dispatch = useSetAtom(modalOpenAtom)

	const { reset } = form
	const reminderData = useReminderDataContext()
	const { deleteReminder, updateReminder, createReminder } = useReminderMutations()
	const syncForm = useSyncForm()

	//* methods

	const closeAndSyncFormFieldsWithEntryInDatabase = useCallback(() => {
		dispatch("CLOSE")
		syncForm()
	}, [dispatch, syncForm])

	const closeAndResetFormFields = useCallback(() => {
		dispatch("CLOSE")
		reset()
	}, [reset, dispatch])

	const closeAndDeleteEntryInDatabase = useCallback(() => {
		deleteReminder.mutate(reminderData.id)
		dispatch("CLOSE")
	}, [dispatch, reminderData.id, deleteReminder])

	const closeAndUpdate = form.handleSubmit((data) => {
		dispatch("CLOSE")
		updateReminder.mutate({ ...data, id: reminderData.id })
	})

	const closeAndCreate = form.handleSubmit((data) => {
		dispatch("CLOSE")
		createReminder.mutate(data)
	})

	return {
		closeAndSyncFormFieldsWithEntryInDatabase,
		closeAndResetFormFields,
		closeAndDeleteEntryInDatabase,
		closeAndUpdate,
		closeAndCreate,
	}
}
