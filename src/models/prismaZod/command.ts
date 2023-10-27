import * as z from "zod"
import { type CompleteCommandArgument, relatedCommandArgumentSchema } from "./index"

export const commandSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	description: z.string(),
})

export interface CompleteCommand extends z.infer<typeof commandSchema> {
	CommandArgument: CompleteCommandArgument[]
}

/**
 * relatedCommandSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCommandSchema: z.ZodSchema<CompleteCommand> = z.lazy(() =>
	commandSchema.extend({
		CommandArgument: relatedCommandArgumentSchema.array(),
	})
)
