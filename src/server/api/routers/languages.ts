import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { type SupportedLanguageData } from "../../../types/types"
import { db2 } from "../../db2"
import { getCountryPrimaryLanguageData } from "../../queries/getCountryPrimaryLanguageData"
import { z } from "zod"
import { supportedLanguageDataSchema } from "../../../models/supportedLanguageDataSchema"

export const languagesRouter = createTRPCRouter({
	getSupportedLanguages: publicProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/country-languages",
				tags: ["languages"],
				summary:
					"Get country and language data and mapping between flag emoji and country.",
				contentTypes: ["application/json"],
				enabled: true,
			},
		})
		.input(z.void())
		.output(z.promise(supportedLanguageDataSchema.array()))
		.query(async (): Promise<SupportedLanguageData[]> => {
			return await db2
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
