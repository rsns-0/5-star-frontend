import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { env } from "../../../env.mjs"

export const baseRouter = createTRPCRouter({
	getOpenApiSchema: publicProcedure.query(async () => {
		return await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/openapi.json`).then((s) => s.json())
	}),
})
