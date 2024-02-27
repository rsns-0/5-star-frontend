import { describe, expect, it } from "vitest"

import * as R from "remeda"

import { serverRouter } from "../src/utils/serverApi"
import { db } from "../src/server/db"
import { histogramDataSchema } from "../src/models/histogram"

describe("histogram", () => {
	let firstId: number

	beforeAll(async () => {
		firstId = await db.country_histogram_materialized
			.findFirstOrThrow({ select: { id: true }, orderBy: { id: "asc" } })
			.then((s) => s.id)
	})
	it("should return first entry in database by default", async () => {
		const res = await serverRouter.histogramRouter
			.getCountryHistogram()
			.then((res) => res.map((s) => s.id))
		expect(res[0]).toBe(firstId)
	})

	it("should not return the specified cursor", async () => {
		const res = await serverRouter.histogramRouter
			.getCountryHistogram({
				take: 10,
				cursor: firstId,
			})
			.then((res) => res.map((s) => s.id))

		expect(res).not.toContain(firstId)
	})

	it("should be ordered from least id to greatest id", async () => {
		const res = await serverRouter.histogramRouter
			.getCountryHistogram({
				take: 10,
				cursor: firstId,
			})
			.then((res) => res.map((s) => s.id))

		expect(res).toEqual(R.sortBy(res, (s) => s))
	})

	it("should have entries sorted from most frequent to least frequent", async () => {
		const res = await serverRouter.histogramRouter
			.getCountryHistogram({
				take: 10,
				cursor: firstId,
			})
			.then((res) => res.map((s) => s.entries))

		const results = res.map((s) => {
			const sorted = R.sortBy(R.clone(s), (s) => s.frequency).reverse()
			return R.equals(s, sorted)
		})
		expect(results.every((s) => s === true)).toBe(true)
	})

	it("should be able to paginate", async () => {
		const page1 = await serverRouter.histogramRouter
			.getCountryHistogram({
				take: 10,
				cursor: firstId,
			})
			.then((res) => res.map((s) => s.id))
		expect(page1).toHaveLength(10)
		const page2 = await serverRouter.histogramRouter
			.getCountryHistogram({
				take: 10,
				cursor: R.last(page1)!,
			})
			.then((s) => s.map((s) => s.id))
		expect(page2).toHaveLength(10)
		expect(R.intersection(page1, page2)).toHaveLength(0)
	})

	it("should return matching schema", async () => {
		const res = await serverRouter.histogramRouter.getCountryHistogram({
			take: 10,
			cursor: firstId,
		})

		const result = histogramDataSchema.strict().array().nonempty().safeParse(res).success
		expect(result).toBe(true)
	})

	it("should not have NaN", async () => {
		const res = await serverRouter.histogramRouter.getCountryHistogram({
			take: 10,
			cursor: firstId,
		})

		const results: number[] = []
		let callCount = 0

		function walk(res: any): any {
			callCount++
			if (typeof res === "number" && isNaN(res)) {
				results.push(res)
			}
			if (Array.isArray(res)) {
				res.forEach(walk)
			}
			if (typeof res === "object" && res !== null) {
				Object.values(res).forEach(walk)
			}
		}
		walk(res)
		expect(results).toHaveLength(0)
		expect(callCount).toBeGreaterThan(0)
	})
})
