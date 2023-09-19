import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
	hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		return {
			greeting: `Hello ${input.text}`,
		}
	}),

	getAll: publicProcedure.query(({ ctx }) => {
		ctx
		return ""
		// return ctx.db.example.findMany();
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!"
	}),

	getReminders: publicProcedure.query(({ ctx }) => {
		return ctx.db.reminders.findMany()
	}),
})
