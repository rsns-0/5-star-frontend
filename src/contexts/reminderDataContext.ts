import { type GetReminderOutput } from "../types/router"

import { contextFactory } from "./contextFactory"

const { useHook, Provider } = contextFactory<GetReminderOutput>()

export const useReminderDataContext = useHook
export const ReminderDataContextProvider = Provider
