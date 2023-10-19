import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

export const landingRouter = createTRPCRouter({
	getSupportedLanguages: publicProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.discord_flag_emojis.findMany({
			select: {
				language: true,
				value: true,
			},
			where: {
				languagesId: {
					not: null,
				},
			},
			orderBy: {
				language: {
					name: "asc",
				},
			},
		})
	}),
})
