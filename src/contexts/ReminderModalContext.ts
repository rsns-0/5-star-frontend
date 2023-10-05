import { useState } from "react"
import { contextFactory } from "./contextFactory"

const { useHook, Provider } = contextFactory<ReturnType<typeof useInitializeReminderModalContext>>()
export const useReminderModalContext = useHook
export const ReminderModalProvider = Provider
export const useInitializeReminderModalContext = () => {
	return useState(false)
}
