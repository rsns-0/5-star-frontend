import { type UseControllerProps, useController, useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	remindersUpdateFormSchema,
	type ReminderUpdateOrCreateFormData,
} from "../models/validationSchemas"
import { createDefaultReminderFieldValues } from "../lib/createDefaultReminderFieldValues"

export const reminderFormConfigs = {
	resolver: zodResolver(remindersUpdateFormSchema),
	defaultValues: createDefaultReminderFieldValues(),
}

export const useReminderForm = ({
	resolver = reminderFormConfigs.resolver,
	defaultValues = reminderFormConfigs.defaultValues,
} = {}) => {
	return useForm<ReminderUpdateOrCreateFormData>({
		resolver,
		defaultValues,
	})
}

export const useReminderFormContext = () => {
	return useFormContext<ReminderUpdateOrCreateFormData>()
}

export const useReminderFormController = (
	props: UseControllerProps<ReminderUpdateOrCreateFormData>
) => {
	return useController(props)
}
