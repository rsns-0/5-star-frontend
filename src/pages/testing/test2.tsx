import { createStore } from "@udecode/zustood"
import { createContext, useContext, useRef } from "react"

const exampStoreFactory = () => {
	const store = createStore(Math.random().toString())({
		count: 1,
	}).extendActions((set, get) => ({
		add: () =>
			set.state((s) => {
				s.count += get.count()
			}),
		multiplier: (n: number) => {
			set.state((s) => {
				s.count *= n
			})
		},
	}))
	return store
}

const StoreContext = createContext<ReturnType<typeof exampStoreFactory> | null>(null) // TS requires `null`, but JS doesn't.

const StoreProvider = ({ children }: any) => {
	const storeRef = useRef<ReturnType<typeof exampStoreFactory> | null>(null)
	if (!storeRef.current) {
		storeRef.current = exampStoreFactory()
	}

	return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

const useStoreContext = () => {
	const store = useContext(StoreContext)
	if (!store) {
		throw new Error("Missing StoreProvider")
	}
	return store
}

function Test2() {
	return (
		<>
			<Ctx1Comp />
			<Ctx2Comp />
		</>
	)
}

function Ctx1Comp() {
	return (
		<StoreProvider>
			<Comp1 />
		</StoreProvider>
	)
}

function Comp1() {
	const store = useStoreContext()
	return (
		<>
			<div>{store.use.count()}</div>
			<button onClick={() => store.set.add()}>add</button>
		</>
	)
}

function Ctx2Comp() {
	return (
		<StoreProvider>
			<Comp1 />
		</StoreProvider>
	)
}

export default Test2
