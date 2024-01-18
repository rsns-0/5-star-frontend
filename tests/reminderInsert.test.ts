import { describe, expect, it } from "vitest"

import dayjs from "dayjs"

import { db } from "../src/server/db"
import { serverRouter } from "../src/utils/serverApi"

describe("insertReminders", () => {
	it("should produce a reminder in the db", async () => {
		const channel_id = "1141613606279061544"
		const time = dayjs().set("years", 2050).toDate()
		const reminder_message = "test"
		const where = await serverRouter.reminderRouter.post.createReminder({
			channel_id,
			time,
			reminder_message,
		})

		const result = await db.reminders.findMany({
			select: {
				id: true,
			},
			where,
			take: 10,
		})
		expect(result).toHaveLength(1)
		expect(result[0]?.id).toBe(where.id)
	})
})
