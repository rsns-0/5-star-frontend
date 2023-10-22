import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const developerInfoRouter = createTRPCRouter({
	getDeveloperInfo: protectedProcedure
		.input(z.object({ content: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.user.findMany({
				where: {
					name: input.content,
				},
			})
			return res
		}),
})
