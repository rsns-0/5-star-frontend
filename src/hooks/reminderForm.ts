import { type ReminderCreateFormData, remindersFormSchema } from "../models/validationSchemas"
import { createDefaultReminderFieldValues } from "../lib/createDefaultReminderFieldValues"
import { createFormContext, zodResolver } from "@mantine/form"

export const [_ReminderFormProviderImpl, useFormContext, useForm] =
	createFormContext<ReminderCreateFormData>()

export const reminderFormConfigs = {
	resolver: zodResolver(remindersFormSchema),
	defaultValues: createDefaultReminderFieldValues(),
}

export const useReminderForm = ({
	resolver = reminderFormConfigs.resolver,
	defaultValues = reminderFormConfigs.defaultValues,
} = {}) => {
	return useForm({
		validate: resolver,
		initialValues: defaultValues,
	})
}

export const useReminderFormContext = () => {
	return useFormContext()
}

// export const useReminderFormController = (props: UseControllerProps<ReminderCreateFormData>) => {
// 	return useController(props)
// }
