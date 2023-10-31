import * as z from "zod"
import { CompleteCommandArgument, relatedCommandArgumentSchema } from "./index"

export const commandSchema = z.object({
  name: z.string(),
  description: z.string(),
  id: z.number().int(),
})

export interface CompleteCommand extends z.infer<typeof commandSchema> {
  CommandArgument: CompleteCommandArgument[]
}

/**
 * relatedCommandSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCommandSchema: z.ZodSchema<CompleteCommand> = z.lazy(() => commandSchema.extend({
  CommandArgument: relatedCommandArgumentSchema.array(),
}))
