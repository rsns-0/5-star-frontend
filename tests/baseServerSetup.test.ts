import { serverRouter } from "../src/utils/serverApi"

describe("tests", () => {
	it("should work", () => {
		expect(true).toBe(true)
	})
})

describe("approuter", () => {
	it("should work in vitest", async () => {
		const { greeting } = await serverRouter.example.hello({ text: "world" })

		expect(greeting).toBe("Hello world")
	})
})
