import { useSyncForm } from "./useSyncForm"



import { useFormContext } from "react-hook-form"

import { useReminderMutations } from "../../hooks/useReminderDatabaseService"

import { type ReminderUpdateFormData } from "../../models/reminder-frontend"
import { useReminderDataContext } from "../../contexts/reminderDataContext"
import { useReminderModalOpenStateContext } from "../../contexts/modalOpenContext"

export function useReminderSubmissionService() {
	//* initialize dependencies
	const { reset, handleSubmit } = useFormContext<ReminderUpdateFormData>()
	const [, dispatch] = useReminderModalOpenStateContext()

	const reminderData = useReminderDataContext()
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
