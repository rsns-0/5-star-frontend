import * as z from "zod"
import { CompleteCommand, relatedCommandSchema } from "./index"

export const commandArgumentSchema = z.object({
  name: z.string(),
  description: z.string(),
  id: z.number().int(),
  commandId: z.number().int(),
})

export interface CompleteCommandArgument extends z.infer<typeof commandArgumentSchema> {
  command: CompleteCommand
}

/**
 * relatedCommandArgumentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCommandArgumentSchema: z.ZodSchema<CompleteCommandArgument> = z.lazy(() => commandArgumentSchema.extend({
  command: relatedCommandSchema,
}))
