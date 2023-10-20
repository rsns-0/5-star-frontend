import { Collection } from "@discordjs/collection"

type Score = Record<string, number>

type LangResult = Record<string, Score>

class InternalScore extends Collection<string, number> {
	toRecord() {
		return Object.fromEntries(this.entries())
	}
	addLanguageScore(languageName: string) {
		const maybeScore = this.get(languageName)
		if (!maybeScore) {
			this.set(languageName, 1)
			return
		}
		this.set(languageName, maybeScore + 1)
	}

	getTopLanguage() {
		const topScore = Math.max(...this.values())

		const topLanguages = this.filter((score) => score === topScore).map((_, key) => key)
		return topLanguages
	}
}

export class PrimaryLanguageScoringAlgorithm {
	private data = new Collection<string, InternalScore>()

	public addCountryForLanguage(countryName: string, language: string) {
		const score = this.data.get(countryName)

		if (!score) {
			this.registerCountryScore(countryName, language)
			return
		}
		score.addLanguageScore(language)
	}

	public getResults() {
		const result: LangResult = {}
		for (const [language, score] of this.data) {
			result[language] = score.toRecord()
		}

		return result
	}
	public getTopLanguagesForCountry(countryName: string) {
		return this.data.get(countryName)?.getTopLanguage()
	}

	public getTopLanguagesForAllCountries() {
		const result: Record<string, string[]> = {}
		for (const [countryName, score] of this.data) {
			result[countryName] = score.getTopLanguage()
		}

		return result
	}

	private registerCountryScore(countryName: string, language: string) {
		const score = new InternalScore()
		score.set(language, 1)
		this.data.set(countryName, score)
	}
}
