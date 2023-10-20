import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

export const languagesRouter = createTRPCRouter({
	getSupportedLanguages: publicProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.discord_flag_emojis.findMany({
			select: {
				language: {
					select: {
						name: true,
					},
				},
				value: true,
			},

			orderBy: {
				languagesId: "asc",
				language: {
					name: "asc",
				},
			},
		})
	}),
})
