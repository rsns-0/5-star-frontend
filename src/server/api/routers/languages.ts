import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { mockLanguageData } from "../../../resources/mockLanguageData"

export const languagesRouter = createTRPCRouter({
	getSupportedLanguages: publicProcedure.query(async ({ ctx: _ctx }) => {
		const res: typeof mockLanguageData = await new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockLanguageData)
			}, 16)
		})
		return res
	}),
})
