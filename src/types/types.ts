import { type RouterOutputs } from "../utils/api"
export interface SupportedLanguageData {
	id: string | number
	name: string
	icon: string
	discordIconLabel: string
	countryName: string
	supported: boolean
}

export type GetAllDevelopersOutput = RouterOutputs["developerInfo"]["getAllDeveloperProfiles"]

interface ISourceData {
	primary_language: string
	full_data: object
}

abstract class CiaData implements ISourceData {
	abstract primary_language: string
	abstract full_data: CiaFullData
}

interface CiaFullData {
	country: string
	languages: Record<string, string>
}

abstract class WikipediaData implements ISourceData {
	abstract primary_language: string
	abstract full_data: WikipediaFullData
}

interface WikipediaFullData {
	widely_spoken: string
	country_region: string
	minority_language: string
	national_language: string
	official_language: string
	regional_language: string
}

export interface CountryResult {
	country_name: string
	cia_data: CiaData
	wikipedia_data: WikipediaData
}
