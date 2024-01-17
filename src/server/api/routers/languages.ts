import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
// import { mockLanguageData } from "../../../resources/mockLanguageData"
import { type SupportedLanguageData } from "../../../types/types"
import { db2 } from "../../db"
import { sql } from "kysely"

export const languagesRouter = createTRPCRouter({
	getSupportedLanguages: publicProcedure.query(async (): Promise<SupportedLanguageData[]> => {
		return db2
			.selectFrom("flag_language")
			.select([
				"id",
				"country_name as countryName",
				sql<string>`'🇺🇸'`.as("icon"),
				"flag_key as discordIconLabel",
				"primary_language as name",
				"is_supported_by_deep_l as supported",
			])
			.limit(20000)
			.execute()

		
	}),
})
// const result = await ctx.db.flag_language.findMany({
		// 	select: {
		// 		id: true,
		// 		country_name: true,
		// 		cca2: true,
		// 		cca3: true,
		// 		is_supported_by_deep_l: true,
		// 		primary_language: true,
		// 		iso1: true,
		// 		iso2: true,
		// 		iso2b: true,
		// 		flag_key: true,
		// 	},
		// })

		// const res: SupportedLanguageData[] = await new Promise((resolve) => {
		// 	setTimeout(() => {
		// 		resolve(mockLanguageData)
		// 	}, 16)
		// })
		// return res