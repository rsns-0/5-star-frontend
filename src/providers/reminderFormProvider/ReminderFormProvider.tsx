import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer } from "react-hook-form-mui"
import {
	type ReminderUpdateFormData,
	remindersUpdateFormSchema,
} from "../../models/reminder-frontend"


import { type GetReminderOutputNotNull } from "../../types/router"

import { createDefaultReminderFieldValues } from "./createDefaultReminderFieldValues"

import { ReminderDataContextProvider } from "../../contexts/reminderDataContext"

function ReminderFormProvider({
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

export function ReminderDialogFormProvider({
	children,
	defaultValues = createDefaultReminderFieldValues(),
	data,
}: {
	children: React.ReactNode
	defaultValues?: ReminderUpdateFormData
	data: GetReminderOutputNotNull
}) {
	return (
		<ReminderDataContextProvider initialValues={data}>
			<ReminderFormProvider defaultValues={defaultValues}>{children}</ReminderFormProvider>
		</ReminderDataContextProvider>
	)
}
