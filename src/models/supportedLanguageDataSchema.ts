import { z } from "zod"
export const supportedLanguageDataSchema = z.object({
	id: z.union([z.string(), z.number()]),
	language: z.string(),
	icon: z.string(),
	discordIconLabel: z.string(),
	countryName: z.string(),
	supported: z.boolean(),
	ISO1: z.string().nullable(),
	ISO2: z.string(),
	ISO2B: z.string().nullable(),
	CCA2: z.string(),
	CCA3: z.string(),
	weight: z.number(),
})
