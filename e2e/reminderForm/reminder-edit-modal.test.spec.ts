import { test, expect } from "@playwright/test"
import { ReminderTablePageModel } from "./reminderTablePage"

test.describe.serial("Reminder CRUD operations", () => {
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

		await p.firstRowLocator.clickDeleteButton()
		const resp = await p.page.waitForResponse("**/trpc/*reminder*.delete*").then((s) => s.ok())
		expect(resp).toBeTruthy()
	})

	test("successfully sends post reminder request", async ({ page }) => {
		const p = new ReminderTablePageModel(page)
		await p.goto()

		await p.clickCreateNewButton()

		await p.messageLocator.fill("message1")
		await p.inputDate()
		await p.inputChannel()
		await p.submit()
		const resp = await p.page.waitForResponse("**/trpc/*reminder*.post*")
		expect(resp.ok()).toBeTruthy()
	})

	test("successfully sends patch reminder request", async ({ page }) => {
		const p = new ReminderTablePageModel(page)
		await p.goto()

		await p.firstRowLocator.clickEditButton()

		await p.messageLocator.fill("message1")
		await p.inputDate()
		await p.inputChannel()
		await p.getModalValues()

		await p.submit()
		const res = await p.page.waitForResponse("**/trpc/*reminder*.patch*")
		expect(res.ok()).toBeTruthy()
	})
})
