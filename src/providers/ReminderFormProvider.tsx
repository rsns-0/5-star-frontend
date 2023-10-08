import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer } from "react-hook-form-mui"
import { type ReminderUpdateFormData, remindersUpdateFormSchema } from "../models/reminder-frontend"

/** Provides context for the  */
export function ReminderFormProvider({
	children,
	defaultValues,
}: {
	children: React.ReactNode
	defaultValues: ReminderUpdateFormData
}) {
	return (
		<FormContainer
			resolver={zodResolver(remindersUpdateFormSchema)}
			defaultValues={defaultValues}
		>
			{children}
		</FormContainer>
	)
}
