import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer } from "react-hook-form-mui"
import {
	type ReminderUpdateFormData,
	remindersUpdateFormSchema,
} from "../../models/reminder-frontend"



import { type GetReminderOutputNotNull } from "../../types/router"

import { createDefaultReminderFieldValues } from "../../lib/createDefaultReminderFieldValues"

import { ReminderDataContextProvider } from "../../contexts/reminderDataContext"

function ReminderFormProvider({
	children,
}: {
	children: React.ReactNode
	defaultValues: ReminderUpdateFormData
}) {
	return (
		<FormContainer
			resolver={zodResolver(remindersUpdateFormSchema)}
			defaultValues={createDefaultReminderFieldValues()}
		>
			{children}
		</FormContainer>
	)
}

export type ReminderDialogFormProviderProps = {
	children: React.ReactNode
	defaultValues?: ReminderUpdateFormData
	data: GetReminderOutputNotNull
}

export function ReminderDialogFormProvider({
	children,
	defaultValues = createDefaultReminderFieldValues(),
	data,
}: ReminderDialogFormProviderProps) {
	return (
		<ReminderDataContextProvider initialValues={data}>
			<ReminderFormProvider defaultValues={defaultValues}>{children}</ReminderFormProvider>
		</ReminderDataContextProvider>
	)
}
