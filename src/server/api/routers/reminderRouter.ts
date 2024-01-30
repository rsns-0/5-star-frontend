import { createTRPCRouter, reminderRLSProcedure } from "~/server/api/trpc"

import { type Prisma } from "@prisma/client"
import {
	remindersServerUpdateSchema,
	remindersServerCreateSchema,
	reminderIdSchema,
} from "../../../models/validationSchemas"
import { insertReminder } from "../../queries/insertReminder"
import { db2 } from "../../db2"

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
					id: true,
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
		return await db2
			.selectFrom("reminders")
			.where("user_id", "=", ctx.userDiscordProviderId)
			.innerJoin("discord_channels", "discord_channels.id", "reminders.channel_id")
			.innerJoin("discord_guilds", "discord_guilds.id", "discord_channels.discord_guild_id")
			.select([
				"reminders.id",
				"reminders.reminder_message",
				"reminders.time",
				"discord_channels.id as channel_id",
				"discord_channels.name as channel_name",
				"discord_guild_id as guild_id",
				"discord_guilds.name as guild_name",
			])
			.orderBy([
				"time desc",
				"discord_guilds.name",
				"discord_channels.name",
				"reminders.reminder_message",
			])
			.limit(10_000)
			.execute()
	}),
})

const patch = createTRPCRouter({
	updateReminder: reminderRLSProcedure
		.input(remindersServerUpdateSchema)
		.mutation(async ({ ctx, input: { id, reminder_message, time, channel_id } }) => {
			const reminder = await ctx.db.reminders.findUnique({
				select: DEFAULT_RETURN,
				where: {
					id,
				},
			})
			if (!reminder) {
				return new Error(
					"The reminder you are trying to update does not exist. Did you try to update a reminder that was just sent to you?"
				)
			}
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
			const reminder = await ctx.db.reminders.findUnique({
				select: DEFAULT_RETURN,
				where: {
					id: input,
				},
			})
			if (!reminder) {
				return new Error(
					"The reminder you are trying to delete does not exist. Did you try to delete a reminder that was just sent to you?"
				)
			}
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
