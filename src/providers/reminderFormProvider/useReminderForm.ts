import { useReminderSubmissionService } from "./useReminderSubmissionService"


import { useGetChannels } from "../../hooks/useReminderDatabaseService"
import { useReminderModalOpenStateContext } from "../../contexts/modalOpenContext"

/**
 * A custom hook that provides access to the form context of the ReminderFormProvider component.
 * @returns An object with the following properties:
 * - form: The form context object, which contains the form state and methods.
 * - reset: A function that resets the form to its default values.
 * - reminderData: The reminder data from the ReminderDataContextProvider component.
 * - deleteReminder: A function that deletes the reminder from the database.
 * - updateReminder: A function that updates the reminder in the database.
 * - createReminder: A function that creates a new reminder in the database.
 * - syncForm: A function that synchronizes the form state with the reminder data.
 * - channels: The list of channels from the database.
 */

export function useReminderForm() {
	// * initialize dependencies
	const [modalIsOpen, dispatch] = useReminderModalOpenStateContext()
	const submissionService = useReminderSubmissionService()
	const channels = useGetChannels()

	// * Methods
	const openModal = () => {
		dispatch("OPEN")
	}

	return {
		modalIsOpen,
		channels,
		openModal,
		submissionService,
	}
}
