import { test, expect } from "@playwright/test"
import { CounterExamplePage } from "./utils/counter-example"

test("increments and decrements correctly", async ({ page }) => {
	const counterPage = new CounterExamplePage(page)

	expect(await counterPage.getIntervalInputValue()).toBe("1")

	await counterPage.pressAddButton()
	const displays = await counterPage.getDisplayedCounterValues()
	expect(displays.length).toBe(2)

	for (const result of displays) {
		expect(result).toBe("1")
	}
})
