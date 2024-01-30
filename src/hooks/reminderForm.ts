import { remindersFormSchema, type ReminderFormData } from "../models/validationSchemas"
import { createDefaultReminderFieldValues } from "../lib/createDefaultReminderFieldValues"
import { createFormContext, zodResolver } from "@mantine/form"

export const [_ReminderFormProviderImpl, useFormContext, useForm] =
	createFormContext<ReminderFormData>()

export const useReminderForm = ({
	resolver = zodResolver(remindersFormSchema),
	defaultValues = createDefaultReminderFieldValues(),
} = {}) => {
	return useForm({
		validate: resolver,
		initialValues: defaultValues,
	})
}

export const useReminderFormContext = () => {
	return useFormContext()
}
