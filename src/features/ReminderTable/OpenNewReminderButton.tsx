import { Button } from "@mantine/core"
import { observer } from "mobx-react"
import { useOpenReminderTableCreateModal } from "../../hooks/reminderTable"

export const OpenNewButton = observer(() => {
	const openNew = useOpenReminderTableCreateModal()
	return (
		<Button data-testid="create new" onClick={openNew}>
			Create New
		</Button>
	)
})
