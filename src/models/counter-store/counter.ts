import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type ICounter = {
	count: number
	interval: number
	add: (qty: number) => void
	subtract: (qty: number) => void
	setInterval: (qty: number) => void
}

export const useCounterStore = create(
	immer<ICounter>((set) => ({
		count: 0,
		interval: 1,
		add: (qty) =>
			set((state) => {
				state.count += qty
			}),
		subtract: (qty) =>
			set((state) => {
				state.count -= qty
			}),
		setInterval: (qty) =>
			set((state) => {
				state.interval = qty
			}),
	}))
)
