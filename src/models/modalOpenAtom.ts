import { atomWithReducer } from "jotai/utils"
const openReducer = (_state: boolean, type: "OPEN" | "CLOSE") => {
	switch (type) {
		case "OPEN":
			return true
		case "CLOSE":
			return false
	}
}

export const modalOpenAtom = atomWithReducer(false as Readonly<boolean>, openReducer)
