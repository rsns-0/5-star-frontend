import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { histogramInputSchema, histogramResultSchema } from "../../../models/histogram"

export const histogramRouter = createTRPCRouter({
	getCountryHistogram: publicProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/country-histograms",
				tags: ["histogram"],
				summary: "Get country histogram data",
			},
		})
		.input(histogramInputSchema)
		.output(histogramResultSchema)
		.query(async ({ ctx: { db }, input }) => {
			const cursor = input?.cursor ? { id: input.cursor } : undefined
			return (await db.country_histogram.findMany({
				...input,
				cursor,
				orderBy: { id: "asc" },
				take: input?.take ?? 500,
			})) as any
		}),
	getLanguageHistogram: publicProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/language-histograms",
				tags: ["histogram"],
				summary: "Get language histogram data",
			},
		})
		.input(histogramInputSchema)
		.output(histogramResultSchema)
		.query(async ({ ctx: { db }, input }) => {
			const cursor = input?.cursor ? { id: input.cursor } : undefined
			return (await db.country_histogram.findMany({
				...input,
				cursor,
				orderBy: { id: "asc" },
				take: input?.take ?? 500,
			})) as any
		}),
})
