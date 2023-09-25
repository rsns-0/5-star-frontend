import { z } from "zod"
import { remindersSchema } from "./prismaZod"
import { DateTime } from "luxon"

export const luxonSchema = z.custom<DateTime>((val) => DateTime.isDateTime(val))

export const luxonToDatePipeline = luxonSchema.transform((val) => val.toJSDate())

export const dateToLuxonPipeline = z.date().transform((val) => DateTime.fromJSDate(val))

const luxonOrDateSchema = z.union([luxonSchema, z.date()])

export const coerceLuxonSchema = luxonOrDateSchema.transform((val) => {
	if (val instanceof Date) {
		return DateTime.fromJSDate(val)
	}
	return val
})

export const coerceDateSchema = luxonOrDateSchema.transform((val) => {
	if (val instanceof Date) {
		return val
	}
	return val.toJSDate()
})

const coerceStringIdSchema = z.union([z.string(), z.bigint()]).transform((val) => {
	if (typeof val === "bigint") {
		return val.toString()
	}
	return val
})

export const remindersFrontendSchema = remindersSchema.extend({
	id: coerceStringIdSchema,
	time: coerceLuxonSchema,
})

export const reminderFrontendToBackendPipeline = remindersFrontendSchema.transform((val) => {
	return {
		...val,
		time: val.time.toJSDate(),
		id: BigInt(val.id),
	}
})

export const remindersFrontEndSchemaCoerceArray = z
	.undefined()
	.or(z.array(remindersFrontendSchema))
	.transform((val) => {
		if (val === undefined) {
			return []
		}
		return val
	})

export type IReminderFrontendData = z.infer<typeof remindersFrontendSchema>
