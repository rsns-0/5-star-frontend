import { type Locator, type Page, expect } from "@playwright/test"
const monthRegex =
	/January|February|March|April|May|June|July|August|September|October|November|December/gi

const TEST_URL = "http://http://127.0.0.1:3000/testing/reminder-table" as const

// const dateRegex =
// 	/\b(0?[1-9]|[12][0-9]|3[01])\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}\b/i
export class ReminderTablePageModel {
	page: Page

	messageLocator: Locator
	timeLocator: Locator
	channelLocator: Locator

	optionsLocator: Locator
	dialogLocator: Locator
	createNewButtonLocator: Locator
	quickFilterLocator: Locator
	firstRowLocator: Row
	calendarWidget: Locator
	calendarTwentyThirdButtonLocator: Locator
	submitButtonLocator: Locator

	constructor(page: Page) {
		this.page = page
		this.dialogLocator = this.page.getByRole("dialog", { name: /.*Reminder$/g })

		this.messageLocator = this.page.getByLabel("Message", { exact: false })
		this.timeLocator = this.page.getByTestId("time")
		this.channelLocator = this.page.getByTestId("channel_id")

		this.optionsLocator = this.page.getByRole("option")
		this.createNewButtonLocator = this.page.getByRole("button", {
			name: "Create New",
			exact: false,
		})
		this.firstRowLocator = new Row(page)
		this.quickFilterLocator = this.page.getByRole("textbox", { name: "Quick Filter" })
		this.calendarWidget = this.page
			.getByRole("dialog")
			.filter({ has: this.page.locator(`div[data-calendar="true"]`) })
		this.calendarTwentyThirdButtonLocator = this.calendarWidget
			.getByRole("button")
			.filter({ hasNotText: monthRegex })
			.filter({ hasText: "23", hasNotText: monthRegex })

		this.submitButtonLocator = this.dialogLocator.getByRole("button", {
			name: "Submit",
			exact: false,
		})
		this.beginLoggingNetworkRequests()
	}

	private beginLoggingNetworkRequests() {
		this.page.on("request", (request) => console.log(">>", request.method(), request.url()))
		this.page.on("response", (response) => console.log("<<", response.status(), response.url()))
	}

	async goto() {
		await this.page.goto(TEST_URL)
	}

	async submit() {
		await this.submitButtonLocator.click()
	}

	async clickCreateNewButton() {
		await this.createNewButtonLocator.click()
	}

	async getMessageValue() {
		return this.messageLocator.inputValue()
	}

	async getChannelValue() {
		return this.channelLocator.inputValue()
	}

	async getModalValues() {
		return {
			reminder_message: await this.getMessageValue(),
			time: await this.getTimeValue(),
			channel_id: await this.getChannelValue(),
		}
	}

	async writeMessage(message: string) {
		await this.messageLocator.fill(message)
	}

	async inputDate() {
		await this.timeLocator.click()
		await this.calendarTwentyThirdButtonLocator.click()
	}

	async inputChannel() {
		await this.channelLocator.focus()
		expect(await this.channelLocator.getAttribute("data-expanded")).toBe("true")
		await this.channelLocator.press("ArrowDown")
		await this.channelLocator.press("ArrowDown")
		await this.channelLocator.press("Enter")
	}

	async getTimeValue() {
		return this.timeLocator.textContent()
	}

	async clickFirstOption() {
		await this.optionsLocator.first().click()
	}

	async expectCreateDialog() {
		const isVisible = await this.page.getByText("Create New", { exact: false }).isVisible()
		expect(isVisible).toBe(true)
	}

	async expectCreateDialogDefaultValues() {
		expect(await this.messageLocator.inputValue()).toBe("")
		const currentDay = new Date().getDay()
		const inputDay = await this.timeLocator.textContent().then((val) => new Date(val!).getDay())
		expect(currentDay).toBe(inputDay)
		expect(await this.channelLocator.inputValue()).toBe("")
	}

	async expectEditDialog() {
		const isVisible = await this.page.getByText("Edit Reminder", { exact: false }).isVisible()
		expect(isVisible).toBe(true)
	}

	async expectEditDialogValues() {
		expect(await this.messageLocator.inputValue()).toBe(
			await this.firstRowLocator.getRowMessageColumnText()
		)
		const timeDialogValue = await getLocatorDayOfDate(this.timeLocator)
		const timeRowValue = await getLocatorDayOfDate(this.firstRowLocator.rowTimeColumnLocator)
		expect(timeDialogValue).toBe(timeRowValue)
		expect(await this.channelLocator.inputValue()).toBe(
			await this.firstRowLocator.getRowChannelColumnText()
		)
	}
}

function getLocatorDayOfDate(locator: Locator) {
	return locator.textContent().then((val) => getDayOfDate(val!))
}

function getDayOfDate(time: string | Date) {
	return new Date(time).getDay()
}

class Row {
	rowLocator: Locator
	editButtonLocator: Locator
	deleteButtonLocator: Locator
	cellLocator: Locator
	rowMessageColumnLocator: Locator
	rowTimeColumnLocator: Locator
	rowChannelColumnLocator: Locator

	constructor(public page: Page) {
		this.rowLocator = page.locator('div[role="row"][row-index="0"]')
		this.editButtonLocator = this.rowLocator.getByRole("button", { name: "Edit", exact: false })
		this.deleteButtonLocator = this.rowLocator.getByRole("button", {
			name: "Delete",
			exact: false,
		})
		this.cellLocator = this.rowLocator.getByRole("gridcell")

		this.rowMessageColumnLocator = this.rowLocator.locator('div[col-id="reminder_message"]')
		this.rowTimeColumnLocator = this.rowLocator.locator('div[col-id="time"]')
		this.rowChannelColumnLocator = this.rowLocator.locator(
			'div[col-id="discord_channels.name"]'
		)
	}

	async getRowMessageColumnText() {
		return await this.rowMessageColumnLocator.textContent()
	}

	async getRowTimeColumnText() {
		return await this.rowTimeColumnLocator.textContent()
	}

	async getRowChannelColumnText() {
		return await this.rowChannelColumnLocator.textContent()
	}

	async clickEditButton(): Promise<void> {
		await this.editButtonLocator.click()
	}

	async clickDeleteButton(): Promise<void> {
		await this.deleteButtonLocator.click()
	}
}
