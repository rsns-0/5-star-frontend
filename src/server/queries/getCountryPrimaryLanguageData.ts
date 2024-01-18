import { db2 } from "../db2"

export function getCountryPrimaryLanguageData() {
	return db2
		.selectFrom("rest_countries_api_new_data as rcand")
		.leftJoin(
			"full_country_primary_languages_materialized as fcpl",
			"rcand.id",
			"fcpl.country_id"
		)
		.leftJoin("country_emoji as ce", "rcand.id", "ce.rest_countries_api_new_data_id")
		.select(({ fn: { coalesce } }) => [
			coalesce("fcpl.country_id", "rcand.id").as("id"),
			coalesce("fcpl.country_name", "rcand.name").as("Country Name"),
			"fcpl.primary_language as Primary Language",
			coalesce("fcpl.cca2", "rcand.cca2").as("CCA2"),
			coalesce("fcpl.cca3", "rcand.cca3").as("CCA3"),
			"primary_language_weight as weight",
			"fcpl.iso1 as ISO1",
			"fcpl.iso2 as ISO2",
			"fcpl.iso2b as ISO2 (B)",
			"ce.emoji as icon",
		])
		.orderBy("fcpl.country_name")
		.limit(10000)
		.execute()
}
