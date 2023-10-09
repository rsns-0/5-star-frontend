import { useSyncForm } from "./useSyncForm"

import { useSetAtom } from "jotai"

import { useFormContext } from "react-hook-form"

import { useReminderMutations } from "../../hooks/useReminderDatabaseService"
import { modalOpenAtom } from "../../models/modalOpenAtom"
import { type ReminderUpdateFormData } from "../../models/reminder-frontend"
import { useReminderDataAtom } from "../../contexts/reminderDataContext"

export function useReminderSubmissionService() {
	//* initialize dependencies
	const { reset, handleSubmit } = useFormContext<ReminderUpdateFormData>()
	const dispatch = useSetAtom(modalOpenAtom)

	const reminderData = useReminderDataAtom()
	const { deleteReminder, updateReminder, createReminder } = useReminderMutations()
	const syncForm = useSyncForm()

	//* methods

	const closeAndSyncFormFieldsWithEntryInDatabase = () => {
		dispatch("CLOSE")
		syncForm()
	}

	const closeAndResetFormFields = () => {
		dispatch("CLOSE")
		reset()
	}

	const closeAndDeleteEntryInDatabase = () => {
		deleteReminder.mutate(reminderData.id)
		dispatch("CLOSE")
	}

	const closeAndUpdate = handleSubmit((data) => {
		dispatch("CLOSE")
		updateReminder.mutate({ ...data, id: reminderData.id })
	})

	const closeAndCreate = handleSubmit((data) => {
		dispatch("CLOSE")
		createReminder.mutate(data)
	})

	const getSubmitAction = (type: "update" | "create") => {
		switch (type) {
			case "update":
				return closeAndUpdate
			case "create":
				return closeAndCreate
			default:
				throw new Error("Invalid type")
		}
	}

	return {
		closeAndSyncFormFieldsWithEntryInDatabase,
		closeAndResetFormFields,
		closeAndDeleteEntryInDatabase,
		closeAndUpdate,
		closeAndCreate,
		getSubmitAction,
	}
}
