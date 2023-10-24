import { type ICellRendererParams } from "ag-grid-community"
import { type ReminderRowItem } from "../../types/types"

export const ReminderTimeRenderer = (params: ICellRendererParams<ReminderRowItem, string>) => {
	if (!params.value) {
		return new Date().toLocaleString()
	}
	return new Date(params.value).toLocaleString()
}
