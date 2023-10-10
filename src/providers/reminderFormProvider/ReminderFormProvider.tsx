import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer } from "react-hook-form-mui"
import {
	type ReminderUpdateFormData,
	remindersUpdateFormSchema,
} from "../../models/reminder-frontend"



import { type GetReminderOutputNotNull } from "../../types/router"

import { createDefaultReminderFieldValues } from "./createDefaultReminderFieldValues"

import { ReminderDataContextProvider } from "../../contexts/reminderDataContext"
import { ReminderModalOpenStateProvider } from "../../contexts/modalOpenContext"

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
		<ReminderModalOpenStateProvider>
			<ReminderDataContextProvider initialValues={data}>
				<ReminderFormProvider defaultValues={defaultValues}>
					{children}
				</ReminderFormProvider>
			</ReminderDataContextProvider>
		</ReminderModalOpenStateProvider>
	)
}

export function withReminderDialogFormProvider<T extends object>(
	Component: React.ComponentType<T>,
	{ data, defaultValues }: Omit<ReminderDialogFormProviderProps, "children">
) {
	return function WithReminderDialogFormProvider(props: T) {
		return (
			<ReminderDialogFormProvider data={data} defaultValues={defaultValues}>
				<Component {...props} />
			</ReminderDialogFormProvider>
		)
	}
}

