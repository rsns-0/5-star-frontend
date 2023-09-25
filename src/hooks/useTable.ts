import { type CellValueChangedEvent } from "ag-grid-community"
import { type AgGridReact } from "ag-grid-react"
import { type RefObject, type Dispatch, type SetStateAction } from "react"

import { useReminder } from "./useReminder"

import {
	type IReminderFrontendData,
	reminderFrontendToBackendPipeline,
} from "../models/reminder-frontend"

export const useTable = (gridRef: RefObject<AgGridReact<IReminderFrontendData>>) => {
	// const [deletedItems, setDeletedItems] = useState<DeletedItemsTracker[]>([]);
	// const [open, setOpen] = useState(false)
	// const deletedItemCount = deletedItems.length
	const model = useReminder()

	function handleDeleteClick() {
		const selectedNodes = gridRef.current!.api.getSelectedNodes()
		const res = selectedNodes
			.map(({ data }) => {
				return data
			})
			.filter((data): data is IReminderFrontendData => {
				if (data) {
					return true
				}
				return false
			})

		gridRef.current!.api.applyTransaction({ remove: res })
	}

	const handleCellChange = (e: CellValueChangedEvent<IReminderFrontendData>) => {
		const { data } = e
		const convertedData = reminderFrontendToBackendPipeline.parse(data)

		model.updateReminder(convertedData)
	}

	const handleFetchData = async () => {
		// setDeletedItems([]);

		const promise = model.refetch().then((res) => {
			if (!res.data) {
				return Promise.reject(new Error("No events found."))
			}
			return res
		})
		return await promise
	}

	/**
	 * Opens a modal to create a new item.
	 * @param setOpen Handler to set the modal to open state.
	 */
	const handleCreateClick = (setOpen: Dispatch<SetStateAction<boolean>>) => {
		throw new Error("Not implemented.")
		setOpen(true)
		// gridRef.current?.api.applyTransaction({ add: [rowData] });
	}

	return {
		handleDeleteClick,
		handleFetchData,
		handleCreateClick,
		handleCellChange,
		data: model.data,
	}
}
