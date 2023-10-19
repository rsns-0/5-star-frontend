import { type Locator } from "@playwright/test"
import { readFileSync, writeFileSync } from "fs"
import { chromium } from "playwright"
import { db } from "../src/server/db"

class Section {
	heading: Locator
	languageInfo: Locator
	constructor(public locator: Locator) {
		this.heading = locator.getByRole("heading")
		this.languageInfo = locator.getByRole("paragraph").nth(0)
	}

	public async get() {
		return {
			heading: await this.heading.textContent(),
			languageInfo: await this.languageInfo
				.textContent()
				.catch((err) => console.log(err + "skipped")),
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const main = async () => {
	const browser = await chromium.launch({
		headless: true,
	})
	const context = await browser.newContext()
	const page = await context.newPage()

	await page.goto(
		"https://web.archive.org/web/20230606082657/https://www.cia.gov/the-world-factbook/field/languages/"
	)
	const relevantSection = page
		.locator("#index-content-section div")
		.filter({
			hasText:
				"This entry provides a listing of languages spoken in each country and specifies ",
		})
		.nth(1)
	const sections = await relevantSection.getByRole("listitem").all()
	page.setDefaultTimeout(2000)
	const promises = sections.map(async (sec) => {
		const section = new Section(sec)
		return section.get()
	})
	const results = await Promise.all(promises)

	// ---------------------
	await context.close()
	await browser.close()
	writeFileSync("testLogs/langData.json", JSON.stringify(results, null, 4))
	console.log("done")
}

const uploadToDb = async () => {
	await db.unstructured_storage.create({
		data: {
			name: "CIA Lang Data",
			json: JSON.parse(readFileSync("testLogs/langData.json", "utf-8")),
		},
	})
	console.log("done")
}
void uploadToDb()
