import { z } from "zod"

export const paginationInputSchema = z
	.object({
		cursor: z.number().describe("ID-based cursor for pagination.").gte(0).optional(),
		take: z.number().describe("The number of records to take").gte(0).lte(10000).optional(),
	})
	.describe("Pagination input")

export const histogramInputSchema = paginationInputSchema.optional()

export const histogramEntrySchema = z
	.object({
		name: z.string().describe("The string label describing the name of the entity."),
		frequency: z
			.number()
			.describe("The number of times the label occurred within the dataset."),
	})
	.describe("Histogram entry")
	.strict()

const notNanSchema = z.coerce
	.number()
	.refine((s) => !isNaN(s), { message: "Value must not be NaN" })

export const histogramDataSchema = z
	.object({
		id: z.coerce
			.number()
			.int()
			.refine((s) => !isNaN(s))
			.describe("The entity ID."),
		entries: histogramEntrySchema.array().nonempty(),
		sample_size: notNanSchema.describe(
			"The total number of string representations for that entity."
		),
		cluster_max: notNanSchema.describe(
			"The frequency of the most frequent string representation."
		),
		cluster_min: notNanSchema.describe(
			"The frequency of the least frequent string representation."
		),
		cluster_avg: notNanSchema.describe("The average frequency value among clusters."),
		cluster_stddev: notNanSchema.describe("The standard deviation among clusters."),
		cluster_range: notNanSchema.describe("The range of frequency values among clusters."),
		cluster_count: notNanSchema.describe("The total number of string representation clusters."),
		mode_count: notNanSchema.describe(
			"The total number of string representation clusters that have the same frequency as the most frequent string representation."
		),
		mode_score: notNanSchema.describe(
			"Score describing the confidence score of the top cluster relative to other significant clusters"
		),
		similarity_max: notNanSchema.describe("The maximum similarity score."),
		similarity_min: notNanSchema.describe("The minimum similarity score."),
		similarity_avg: notNanSchema.describe("The average similarity score."),
		similarity_stddev: notNanSchema.describe("The standard deviation among similarity scores."),
		similarity_range: notNanSchema.describe("The range of similarity scores."),
	})
	.describe("Histogram data")
	.strict()

export const histogramResultSchema = histogramDataSchema.array()