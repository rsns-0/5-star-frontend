import { atom, useAtomValue } from "jotai"
import { type GetReminderOutputNotNull, type GetReminderOutput } from "../types/router"
import { useHydrateAtoms } from "jotai/utils"

const reminderDataAtom = atom<GetReminderOutput>(null)

export const useReminderDataAtom = () => {
	const reminderData = useAtomValue(reminderDataAtom)
	if (!reminderData) {
		throw new Error("useReminderDataAtom must be used within a ReminderDataContextProvider")
	}
	return reminderData
}

const HydrateAtoms = ({
	initialValues,
	children,
}: {
	initialValues: GetReminderOutputNotNull
	children: React.ReactNode
}) => {
	// initialising on state with prop on render here
	useHydrateAtoms([[reminderDataAtom, initialValues]])
	return children
}

export const ReminderDataContextProvider = ({
	initialValues,
	children,
}: {
	initialValues: GetReminderOutputNotNull
	children: React.ReactNode
}) => {
	return (
		<>
			{/* <Provider atoms={[reminderDataAtom]}>{children}</Provider> */}
			<HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
		</>
	)
}
