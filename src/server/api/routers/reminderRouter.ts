import { createTRPCRouter, reminderRLSProcedure } from "~/server/api/trpc"

import { type Prisma } from "@prisma/client"
import {
	remindersServerUpdateSchema,
	remindersServerCreateSchema,
	reminderIdSchema,
} from "../../../models/validationSchemas"
import { insertReminder } from "../../queries/insertReminder"

export const DEFAULT_SELECT = {
	id: true,
	reminder_message: true,
	time: true,
	channel_id: true,
	discord_channels: {
		select: {
			id: true,
			name: true,
			discord_guilds: {
				select: {
					name: true,
				},
			},
		},
	},
} as const satisfies Prisma.remindersSelect

export const DEFAULT_RETURN = {
	id: true,
} as const satisfies Prisma.remindersSelect

const get = createTRPCRouter({
	getReminderById: reminderRLSProcedure.input(reminderIdSchema).query(async ({ ctx, input }) => {
		return await ctx.db.reminders.findUnique({
			select: DEFAULT_SELECT,
			where: {
				id: input,
			},
		})
	}),
	getRemindersById: reminderRLSProcedure
		.input(reminderIdSchema.array())
		.query(async ({ ctx, input }) => {
			return await ctx.db.reminders.findMany({
				select: DEFAULT_SELECT,
				where: {
					id: { in: input },
				},
			})
		}),
	getAllReminders: reminderRLSProcedure.query(async ({ ctx }) => {
		return await ctx.db.reminders.findMany({
			select: DEFAULT_SELECT,
			where: {
				user_id: ctx.session.user.id,
			},
		})
	}),
})

const patch = createTRPCRouter({
	updateReminder: reminderRLSProcedure
		.input(remindersServerUpdateSchema)
		.mutation(async ({ ctx, input: { id, reminder_message, time, channel_id } }) => {
			return await ctx.db.reminders.update({
				select: DEFAULT_RETURN,
				where: {
					id,
				},
				data: {
					reminder_message,
					time,
					channel_id,
				},
			})
		}),
})

const deleteRouter = createTRPCRouter({
	deleteReminder: reminderRLSProcedure
		.input(reminderIdSchema)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.reminders.delete({
				select: DEFAULT_RETURN,
				where: {
					id: input,
				},
			})
		}),

	deleteReminders: reminderRLSProcedure
		.input(reminderIdSchema.array())
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.reminders.deleteMany({
				where: {
					id: { in: input },
				},
			})
		}),
})

const post = createTRPCRouter({
	createReminder: reminderRLSProcedure
		.input(remindersServerCreateSchema)
		.mutation(
			async ({
				ctx: { userDiscordProviderId },
				input: { channel_id, reminder_message, time },
			}) => {
				return await insertReminder({
					channel_id,
					reminder_message,
					time,
					userDiscordProviderId,
				})
			}
		),
})



export const reminderRouter = createTRPCRouter({
	get,
	patch,
	delete: deleteRouter,
	post,
})
