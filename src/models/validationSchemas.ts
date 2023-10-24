import { z } from "zod"

const reminderFormItemIdSchema = z
	.number()
	.gte(0, "ID was negative.")
	.lte(Number.MAX_SAFE_INTEGER, "ID was too large.")

export const remindersUpdateFormSchema = z.object({
	id: reminderFormItemIdSchema,
	time: z
		.date()
		.max(new Date(99_999, 1, 1), { message: "Date is too far in the future." })
		.min(new Date(1, 0, 1), { message: "Date is too far in the past." }),
	reminder_message: z.string().transform((val, ctx) => {
		if (val.length > 500) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Message must be less than 500 characters.",
			})
		}
		if (val.length <= 0) {
			return "Ping!"
		}
		return val
	}),
	channel_id: z.string().min(1, "Channel ID was blank.").max(500, "Channel ID was too large."),
})

export type ReminderUpdateFormData = z.infer<typeof remindersUpdateFormSchema>

export const remindersServerUpdateSchema = remindersUpdateFormSchema

export type ReminderCreateFormData = z.infer<typeof remindersCreateSchema>

export type ReminderUpdateOrCreateFormData = ReminderUpdateFormData | ReminderCreateFormData

export const remindersCreateSchema = remindersUpdateFormSchema.omit({ id: true })

export type ReminderDeleteFormData = z.infer<typeof remindersDeleteSchema>

export const remindersDeleteSchema = reminderFormItemIdSchema
