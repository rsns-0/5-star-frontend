import { describe, expect, it } from "vitest"
import { PrimaryLanguageScoringAlgorithm } from "./primaryLanguageScoringAlgorithm"
import { getValueForFirstKeyOfObject } from "../utils"

const expected = {
	Latvia: {
		Latvian: 2,
		asd123: 1,
	},
}

describe("Scoring Algorithm", () => {
	it("Latvia should exist after adding", () => {
		const alg = new PrimaryLanguageScoringAlgorithm()
		alg.addCountryForLanguage("Latvia", "asd123")
		const results = alg.getResults()
		expect(results.Latvia).toBeDefined()
	})

	it("For Latvia, Latvian should have a score of 2.", () => {
		const alg = new PrimaryLanguageScoringAlgorithm()
		alg.addCountryForLanguage("Latvia", "Latvian")
		alg.addCountryForLanguage("Latvia", "Latvian")
		const results = alg.getResults()
		expect(results.Latvia!.Latvian).toBe(2)
	})

	it("should correctly return the top language for a country", () => {
		const alg = new PrimaryLanguageScoringAlgorithm()
		alg.addCountryForLanguage("Latvia", "asd123")
		alg.addCountryForLanguage("Latvia", "Latvian")
		alg.addCountryForLanguage("Latvia", "Latvian")
		const res = alg.getTopLanguagesForCountry("Latvia")
		expect(res?.[0]).toBe("Latvian")
	})

	it("should return the correct data structure", () => {
		const alg = new PrimaryLanguageScoringAlgorithm()
		alg.addCountryForLanguage("Latvia", "asd123")
		alg.addCountryForLanguage("Latvia", "Latvian")
		alg.addCountryForLanguage("Latvia", "Latvian")
		const res = alg.getResults()
		expect(res).toEqual(expected)
	})
})
