import { z } from "zod"
import { dateConverter } from "../src/services/dateService"

describe("DateConverter", () => {
	it("should format date as MM/DD/YYYY hh:mm A ", () => {
		const pattern = z.string().regex(/\d\d\/\d\d\/\d\d\d\d \d\d:\d\d \w\w/g)

		const date = dateConverter.formatDate(new Date())
		const result = pattern.safeParse(date)
		expect(result.success).toBe(true)
	})
})
