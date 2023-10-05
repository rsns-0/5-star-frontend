import { createContext, useContext } from "react"

export const contextFactory = <T>() => {
	const ctx = createContext<T | null>(null)
	const useHook = () => {
		const ctxValue = useContext(ctx)
		if (!ctxValue) {
			throw new Error(
				`use${ctx.displayName} must be used within a ${ctx.displayName}Provider`
			)
		}
		return ctxValue
	}
	return {
		Provider: ctx.Provider,
		useHook,
	}
}
