import { type Locator, type Page } from "@playwright/test"

export class CounterExamplePage {
	readonly page: Page
	readonly addButton: Locator
	readonly subtractButton: Locator
	readonly intervalInput: Locator

	constructor(page: Page) {
		this.page = page
		this.addButton = page.getByText("Increment")
		this.subtractButton = page.getByText("Decrement")
		this.intervalInput = page.getByTitle("Interval Input")
	}

	async goto() {
		await this.page.goto("localhost:3000/counter-example")
	}

	async pressAddButton() {
		await this.addButton.click()
	}

	async pressSubtractButton() {
		await this.subtractButton.click()
	}

	async getDisplayedCounterValues() {
		return await this.page.getByTestId("count").allInnerTexts()
	}

	async getIntervalInputValue() {
		return await this.intervalInput.inputValue()
	}

	async setIntervalInputValue(value: number) {
		await this.intervalInput.fill(value.toString())
	}
}
