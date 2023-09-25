import { createTRPCRouter, reminderRLSProcedure } from "~/server/api/trpc"
import { remindersSchema } from "../../../models/prismaZod"
import { z } from "zod"

export const reminderRouter = createTRPCRouter({
	getReminders: reminderRLSProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.reminders.findMany({
			where: {
				user_id: ctx.session?.user.id,
			},
		})
		return res
	}),
	createReminder: reminderRLSProcedure.input(remindersSchema).mutation(async ({ ctx, input }) => {
		await ctx.db.reminders.create({
			data: {
				...input,
			},
		})

		return true
	}),
	updateReminder: reminderRLSProcedure
		.input(remindersSchema.pick({ time: true, reminder_message: true, id: true }))
		.mutation(async ({ ctx, input: { id, reminder_message, time } }) => {
			await ctx.db.reminders.update({
				where: {
					id,
				},
				data: {
					reminder_message,
					time,
				},
			})
			return true
		}),
	deleteReminder: reminderRLSProcedure.input(z.bigint()).mutation(async ({ ctx, input }) => {
		await ctx.db.reminders.delete({
			where: {
				id: input,
			},
		})
		return true
	}),

	deleteReminders: reminderRLSProcedure
		.input(z.bigint().array())
		.mutation(async ({ ctx, input }) => {
			await ctx.db.reminders.deleteMany({
				where: {
					id: { in: input },
				},
			})
			return true
		}),
})
