import { createTRPCRouter, reminderRLSProcedure } from "~/server/api/trpc"
import { remindersSchema } from "../../../models/prismaZod"
import { z } from "zod"
import { remindersUpdateSchema } from "../../../models/reminder-frontend"

export const reminderRouter = createTRPCRouter({
	getReminders: reminderRLSProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.reminders.findMany({
			select: {
				id: true,
				user_id: true,
				created_at: true,
				reminder_message: true,
				time: true,
				webhook_id: true,
				channel_id: true,
				discord_channels: {
					select: {
						name: true,
						discord_guilds: {
							select: {
								name: true,
							},
						},
					},
				},
			},
			where: {
				user_id: ctx.session.user.id,
			},
		})
		return res.map((r) => {
			const { discord_channels, ...rest } = r
			return {
				...rest,
				channel_name: discord_channels.name,
				guild_name: discord_channels.discord_guilds?.name,
			}
		})
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
		.input(remindersUpdateSchema)
		.mutation(async ({ ctx, input: { id, reminder_message, time, channel_id } }) => {
			await ctx.db.reminders.update({
				where: {
					id,
				},
				data: {
					reminder_message,
					time,
					channel_id,
				},
			})
			return true
		}),
	deleteReminder: reminderRLSProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
		await ctx.db.reminders.delete({
			where: {
				id: input,
			},
		})
		return true
	}),

	deleteReminders: reminderRLSProcedure
		.input(z.number().array())
		.mutation(async ({ ctx, input }) => {
			await ctx.db.reminders.deleteMany({
				where: {
					id: { in: input },
				},
			})
			return true
		}),
})
