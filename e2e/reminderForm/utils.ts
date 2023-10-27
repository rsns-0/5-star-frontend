import { type Page, type Route, type Locator } from "@playwright/test"
import { z } from "zod"
import { mockChannelData, mockReminderData } from "../../src/server/resources/mockData"

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

export function getDayOfDate(time: string | Date) {
	return new Date(time).getDay()
}

export class CalendarButtonSearcher {
	private constructor(
		public locator: Locator,
		public buttonData: Locator[]
	) {}

	static async createFromInitialCalendarElement(locator: Locator) {
		const buttons = await CalendarButtonSearcher.getCalendarButtons(locator)
		return new CalendarButtonSearcher(locator, buttons)
	}

	static async getCalendarButtons(locator: Locator) {
		const buttonPromises = await locator
			.getByRole("button")
			.all()
			.then((buttons) => {
				return buttons.map(async (button) => {
					const attribute = await button.getAttribute("aria-label")
					return {
						button,
						attribute,
					}
				})
			})
		const buttonData = await Promise.all(buttonPromises)
		const calendarButtonData = buttonData.filter((buttonData) => {
			months.find((month) => buttonData.attribute?.includes(month))
		})
		return calendarButtonData.map((data) => data.button)
	}

	getCalendarButtonWithDay(dateDay: number) {
		z.number().min(1).max(31).parse(dateDay)
		const button = this.buttonData.find((button) =>
			button.textContent().then((text) => text?.includes(dateDay.toString()))
		)
		if (!button) {
			throw new Error(`Could not find button with day ${dateDay}`)
		}
	}
}

export class ApiDataMockUtil {
	constructor(public page: Page) {}

	async mockGetReminderData() {
		await this.page.route("**/trpc/*reminder*.get*", async (route) => {
			const response = await route.fetch()
			const json = await response.json()
			json[1].result.data.json = mockReminderData

			await route.fulfill({
				json,
				response,
			})
		})
	}

	async mockGetChannelData() {
		await this.page.route("**/trpc/discord*.get*", async (route) => {
			const response = await route.fetch()
			const json = await response.json()
			json[0].result.data.json = mockChannelData

			await route.fulfill({
				json,
				response,
			})
		})
		await this.page.waitForTimeout(500)
	}

	async cleanup() {
		await this.page.unroute("*")
	}
}

export class TestApiMockUtil<T> {
	private result: T
	constructor(
		public page: Page,
		result?: any
	) {
		this.result = result
	}

	getResult() {
		return this.result
	}

	async mockDeleteRequests() {
		await this.page.route("**/trpc/*reminder*.delete*", async (route) => {
			await route.fulfill({
				json: {
					message: "ok",
				},
			})
			this.result = getJSON(route)
		})
	}

	async mockPatchRequests() {
		await this.page.route("**/trpc/*reminder*.patch*", async (route) => {
			await route.fulfill({
				json: {
					message: "ok",
				},
			})
			this.result = getJSON(route)
		})
	}

	async mockPostRequests() {
		await this.page.route("**/trpc/*reminder*.post*", async (route) => {
			await route.fulfill({
				json: {
					message: "ok",
				},
			})
			this.result = getJSON(route)
		})
	}

	async mockGetRequests() {
		await this.page.route("**/trpc/*reminder*.get*", async (route) => {
			await route.fulfill({
				json: {
					message: "ok",
				},
			})
			this.result = getJSON(route)
		})
	}
}

function getJSON(route: Route) {
	return route.request().postDataJSON()[0].json
}
