import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { histogramInputSchema, histogramResultSchema } from "../../../models/histogram"
import { type z } from "zod"
import { type Prisma } from "@prisma/client"

function createHistogramQueryData(data: z.infer<typeof histogramInputSchema>) {
	const cursor = data?.cursor ? { id: data.cursor } : undefined
	const input = {
		...data,
		cursor,
		orderBy: { id: "asc" },
		take: data?.take ?? 500,
		skip: cursor === undefined ? 0 : 1,
	} as const satisfies Prisma.country_histogramFindManyArgs
	return input
}

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
			return (await db.country_histogram_materialized.findMany(
				createHistogramQueryData(input)
			)) as any
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
			return (await db.language_histogram_materialized.findMany(
				createHistogramQueryData(input)
			)) as any
		}),
})
