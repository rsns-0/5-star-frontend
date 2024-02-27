import { z } from "zod"

export const histogramInputSchema = z
	.object({
		cursor: z.number().describe("ID-based cursor for pagination.").gte(0).optional(),
		take: z.number().describe("The number of records to take").gte(0).lte(10000).optional(),
	})
	.optional()
	.describe("Pagination input")

export const histogramEntrySchema = z
	.object({
		name: z.string().describe("The string label describing the name of the entity."),
		frequency: z
			.number()
			.describe("The number of times the label occurred within the dataset."),
	})
	.describe("Histogram entry")

export const histogramResultSchema = z
	.object({
		id: z.coerce.number().int().describe("The entity ID."),
		entries: histogramEntrySchema.array(),
		sample_size: z.coerce
			.number()
			.describe("The total number of string representations for that entity."),
		cluster_max: z.coerce
			.number()
			.describe("The frequency of the most frequent string representation."),
		cluster_min: z.coerce
			.number()
			.describe("The frequency of the least frequent string representation."),
		cluster_avg: z.coerce.number().describe("The average frequency value among clusters."),
		cluster_stddev: z.coerce.number().describe("The standard deviation among clusters."),
		cluster_count: z.coerce
			.number()
			.describe("The total number of string representation clusters."),
		mode_count: z.coerce
			.number()
			.describe(
				"The total number of string representation clusters that have the same frequency as the most frequent string representation."
			),
		mode_score: z.coerce
			.number()
			.describe(
				"Score describing the confidence score of the top cluster relative to other significant clusters"
			),
		similarity_max: z.coerce.number().describe("The maximum similarity score."),
		similarity_min: z.coerce.number().describe("The minimum similarity score."),
		similarity_avg: z.coerce.number().describe("The average similarity score."),
		similarity_stddev: z.coerce
			.number()
			.describe("The standard deviation among similarity scores."),
		similarity_range: z.coerce.number().describe("The range of similarity scores."),
	})
	.describe("Histogram data")
	.array()
