import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { developerInfoRouter } from "./routers/developerInfo";
import { languagesRouter } from "./routers/languages"
import { discordRouter } from "./routers/discordRouter"
import { reminderRouter } from "./routers/reminderRouter"
import { getServerAuthSession } from "../auth"
import { type GetServerSidePropsContext } from "next"
import { db } from "../db"


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	example: exampleRouter,
	developerInfo: developerInfoRouter,
	languages: languagesRouter,
	discordRouter: discordRouter,
	reminderRouter: reminderRouter,
})

export const createAppRouterFromRequestContext = (ctx: GetServerSidePropsContext) => {
	return getServerAuthSession(ctx).then((session) => {
		return appRouter.createCaller({
			session: session,
			db: db,
		})
	})
}

// export type definition of API
export type AppRouter = typeof appRouter
