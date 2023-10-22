import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

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
	getAllDeveloperProfiles: publicProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.user.findMany({
			select: {
				id: true,
				name: true,
				image: true,
				role: true,
			},
			where: {
				role: "developer",
			},
		})
		return res.map(({ id, image, name, role }) => {
			return {
				id,
				src: image,
				name: name ?? "",
				role: role ? titleCased(role) : "",
			}
		})
	}),
})

function titleCased(text: string) {
	const first = text.at(0)
	if (!first) {
		return ""
	}
	return first.toUpperCase() + text.slice(1)
}