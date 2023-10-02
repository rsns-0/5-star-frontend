import { type useReminderDatabaseService } from "../hooks/useReminderDatabaseService"

export type DataContext =
	| (NonNullable<ReturnType<typeof useReminderDatabaseService>["data"]>[0] & {
			open: boolean
			setOpen: (open: boolean) => void
	  })
	| null
