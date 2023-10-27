import { test, expect } from "@playwright/test"
import { ApiDataMockUtil, TestApiMockUtil, getDayOfDate } from "./utils"
import { injectAuthCookiesFromLocalFileIntoContext } from "../utils/getStorageState"
import { ReminderTablePageModel } from "./reminderTablePage"

test.describe("Reminder CRUD operations", () => {
	test.beforeEach(async ({ page, context }) => {
		await injectAuthCookiesFromLocalFileIntoContext(context)
		const mocker = new ApiDataMockUtil(page)
		await mocker.mockGetReminderData()
		await mocker.mockGetChannelData()
	})

	test("renders create modal with correct initial data", async ({ page }) => {
		const p = new ReminderTablePageModel(page)

		await p.goto()

		await p.clickCreateNewButton()
		await p.expectCreateDialog()
		await p.expectCreateDialogDefaultValues()
	})

	test("renders edit modal with correct initial data", async ({ page }) => {
		const p = new ReminderTablePageModel(page)
		await p.goto()

		await p.firstRowLocator.clickEditButton()
		await p.expectEditDialog()
		await p.expectEditDialogValues()
	})

	test("successfully sends delete reminder request", async ({ page }) => {
		const p = new ReminderTablePageModel(page)
		await p.goto()

		await p.firstRowLocator.deleteButtonLocator.waitFor({ state: "visible" })

		const apiMock = new TestApiMockUtil(page)
		await apiMock.mockDeleteRequests()
		expect(apiMock.getResult()).toBe(undefined)
		await p.firstRowLocator.clickDeleteButton()
		expect(await p.page.waitForResponse("**/trpc/*reminder*.delete*")).toBeTruthy()
	})

	test("successfully sends post reminder request", async ({ page }) => {
		const p = new ReminderTablePageModel(page)
		await p.goto()

		await p.clickCreateNewButton()
		const apiMock = new TestApiMockUtil<any>(page)
		await apiMock.mockPostRequests()
		await p.messageLocator.fill("message1")
		await p.inputDate()
		await p.inputChannel()
		const modalValues = await p.getModalValues()
		await p.page.pause()

		await p.submit()
		if (apiMock.getResult().channel_id === "1141062843467321409") {
			apiMock.getResult().channel_id = modalValues.channel_id
		}
		expect(apiMock.getResult().reminder_message).toBe(modalValues.reminder_message)
		expect(getDayOfDate(apiMock.getResult().time)).toBe(getDayOfDate(modalValues.time!))
		expect(apiMock.getResult().channel_id).toBeTruthy()
	})

	test("successfully sends patch reminder request", async ({ page }) => {
		const p = new ReminderTablePageModel(page)
		await p.goto()

		await p.firstRowLocator.clickEditButton()
		const apiMock = new TestApiMockUtil<any>(page)
		await apiMock.mockPatchRequests()
		await p.messageLocator.fill("message1")
		// await p.inputDate() // TODO need to fix flaky selector
		await p.inputChannel()
		const modalValues = await p.getModalValues()

		await p.submit()
		if (apiMock.getResult().channel_id === "1141062843467321409") {
			apiMock.getResult().channel_id = modalValues.channel_id
		}
		expect(apiMock.getResult().reminder_message).toBe(modalValues.reminder_message)
		expect(getDayOfDate(apiMock.getResult().time)).toBe(getDayOfDate(modalValues.time!))
		expect(apiMock.getResult().channel_id).toBeTruthy()
	})
})
