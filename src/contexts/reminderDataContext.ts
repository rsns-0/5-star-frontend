import { atom, useAtomValue } from "jotai"
import { type GetReminderOutput } from "../types/router"

import { contextFactory } from "./contextFactory"

const { useHook, Provider } = contextFactory<GetReminderOutput>()

const reminderDataAtom = atom<GetReminderOutput>(null)

export const useReminderDataAtom = () => {
	const reminderData = useAtomValue(reminderDataAtom)
	if (!reminderData) {
		throw new Error("useReminderDataAtom must be used within a ReminderDataContextProvider")
	}
	return reminderData
}

export const useReminderDataContext = useHook
export const ReminderDataContextProvider = Provider
