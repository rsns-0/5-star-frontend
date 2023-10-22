import { faker } from "@faker-js/faker"
import { type SupportedLanguageData } from "../types/types"

function randomFlag() {
	const number = faker.number.int(100)
	if (number < 33) {
		return "🇺🇸"
	} else if (number < 66) {
		return "🇪🇸"
	} else {
		return "🇫🇷"
	}
}

function createRandomData() {
	const data = []
	for (let i = 0; i < 100; i++) {
		data.push({
			id: (i + 1000).toString(),
			name: faker.word.noun(),
			countryName: faker.location.country(),
			icon: randomFlag(),
			discordIconLabel: faker.word.verb(),
			supported: faker.datatype.boolean(),
		})
	}
	return data
}

export const mockLanguageData: SupportedLanguageData[] = [
	{
		id: "1",
		name: "English",
		countryName: "United States",
		icon: "🇺🇸",
		discordIconLabel: "flag_us",
		supported: true,
	},
	{
		id: "2",
		name: "Spanish",
		countryName: "Spain",
		icon: "🇪🇸",
		discordIconLabel: "flag_es",
		supported: true,
	},
	{
		id: "3",
		name: "French",
		countryName: "France",
		icon: "🇫🇷",
		discordIconLabel: "flag_fr",
		supported: false,
	},
	...createRandomData(),
]
