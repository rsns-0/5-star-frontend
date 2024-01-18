import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { type SupportedLanguageData } from "../../../types/types"
import { db2 } from "../../db2"
import { getCountryPrimaryLanguageData } from "../../queries/getCountryPrimaryLanguageData"

export const languagesRouter = createTRPCRouter({
	getSupportedLanguages: publicProcedure.query(async (): Promise<SupportedLanguageData[]> => {
		return db2
			.selectFrom("flag_language_materialized")
			.select([
				"id",
				"country_name as countryName",
				"flag_emoji as icon",
				"flag_key as discordIconLabel",
				"primary_language as language",
				"is_supported_by_deep_l as supported",
				"cca2 as CCA2",
				"cca3 as CCA3",
				"iso1 as ISO1",
				"iso2 as ISO2",
				"iso2b as ISO2B",
				"primary_language_weight as weight",
			])
			.orderBy("countryName")
			.limit(10000)
			.execute()
	}),
	getCountryPrimaryLanguageData: publicProcedure.query(getCountryPrimaryLanguageData),
})
