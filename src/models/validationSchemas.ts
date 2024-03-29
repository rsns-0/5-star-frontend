import { z } from "zod"
import { commandArgumentSchema, commandSchema } from "./prismaZod"

export const reminderIdSchema = z
	.number()
	.gte(0, "ID was negative.")
	.lte(Number.MAX_SAFE_INTEGER, "ID was too large.")

export const remindersFormSchema = z.object({
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
	channel_id: z.string().min(1, "Must select a channel.").max(500, "Channel ID was too large."),
	guild_id: z.string().min(1, "Must select a guild.").max(500, "Guild ID was too large."),
})

export type ReminderFormData = z.infer<typeof remindersFormSchema>

export const remindersServerUpdateSchema = remindersFormSchema.omit({ guild_id: true }).extend({
	id: reminderIdSchema,
})

export type ReminderUpdateFormData = z.infer<typeof remindersServerUpdateSchema>

export const remindersServerCreateSchema = remindersFormSchema.omit({ guild_id: true })

export type ReminderCreateFormData = z.infer<typeof remindersServerCreateSchema>

export type ReminderUpdateOrCreateFormData = ReminderUpdateFormData | ReminderCreateFormData

export type ReminderDeleteFormData = z.infer<typeof remindersDeleteSchema>

export const remindersDeleteSchema = reminderIdSchema

const commandArgumentFormSchema = commandArgumentSchema.omit({
	commandId: true,
	id: true,
})

export const commandFormSchema = commandSchema.extend({
	commandArgs: commandArgumentFormSchema.array().min(1),
})
