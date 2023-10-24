import { type ICellRendererParams, type ColDef } from "ag-grid-community"
import { type ReminderColDef } from "../../types/types"
import { RowActions } from "./RowActions"
import styles from "./ReminderTable.module.css"

export const columnDefs: ColDef<ReminderColDef>[] = [
	{ field: "id", headerName: "ID" },
	{ field: "discord_channels.name", headerName: "Channel Name" },
	{
		field: "time",
		cellRenderer: (params: ICellRendererParams<ReminderColDef, Date>) => {
			if (!params.value) {
				return new Date().toLocaleString()
			}
			return params.value.toLocaleString()
		},
	},
	{ field: "reminder_message", headerName: "Message" },
	{ field: "discord_channels.discord_guilds.name", headerName: "Server Name" },
	{
		field: "actions",
		headerName: "Actions",
		cellClass: styles.actionRow,
		cellRenderer: RowActions,
		resizable: false,
		filter: false,
		lockPosition: "right",
		maxWidth: 150,
	},
]

export const defaultColDef: ColDef<ReminderColDef> = {
	flex: 1,
	minWidth: 100,
	resizable: true,
	sortable: true,
	filter: true,
	lockVisible: true,
}
