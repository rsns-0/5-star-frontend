import { type ICellRendererParams } from "ag-grid-community"
import { type ReminderData } from "../../types/types"

export const ReminderTimeRenderer = (params: ICellRendererParams<ReminderData, string>) => {
	if (!params.value) {
		return new Date().toLocaleString()
	}
	return new Date(params.value).toLocaleString()
}
