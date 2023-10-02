import { type GetRemindersOutput } from "../../types/router"

import {
	reminderDataContext,
	useReminderModalContextConstructor,
} from "../../contexts/reminderDataContext"
import ReminderEditModal from "./modal/ReminderEditModal"
import { DataViewCard } from "./DataViewCard"

// function useTextInputBehavior(onSave: (textInputValue: string) => void) {
// 	const [isEditing, setIsEditing] = useState(false)
// 	const [text, setText] = useState("")

// 	function handleSave() {
// 		setIsEditing(!isEditing)
// 		onSave("")
// 	}

// 	function handleCancel() {
// 		setIsEditing(!isEditing)

// 		setText("")
// 	}

// 	const onKeyDown = (e: any) => {
// 		switch (e.key) {
// 			case "Escape":
// 				handleCancel()
// 				break
// 			case "Enter":
// 				handleSave()
// 				break
// 		}
// 	}

// 	const onFocus = (e: any) => {
// 		e.target.setSelectionRange(0, e.target.value.length)
// 		e.target.scrollLeft = e.target.scrollWidth
// 	}

// 	const exports = {
// 		autoFocus: true,
// 	}
// }

export function DataViewListItem({ data }: { data: GetRemindersOutput }) {
	return (
		<>
			<div className="col-12 gap-4">
				<reminderDataContext.Provider value={useReminderModalContextConstructor(data)}>
					<DataViewCard />
					<ReminderEditModal />
				</reminderDataContext.Provider>
			</div>
		</>
	)
}
