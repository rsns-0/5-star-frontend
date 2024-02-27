import * as z from "zod"
import { Decimal } from "decimal.js"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const country_histogramSchema = z.object({
  id: z.number().int(),
  entries: jsonSchema,
  sample_size: z.number(),
  cluster_max: z.bigint(),
  cluster_min: z.bigint(),
  cluster_avg: z.number(),
  cluster_stddev: z.number(),
  cluster_range: z.bigint(),
  cluster_count: z.bigint(),
  mode_count: z.bigint(),
  mode_score: z.number(),
  similarity_max: z.number(),
  similarity_min: z.number(),
  similarity_avg: z.number(),
  similarity_stddev: z.number(),
  similarity_range: z.number(),
})
