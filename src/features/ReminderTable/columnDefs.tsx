import { type ICellRendererParams, type ColDef } from "ag-grid-community"
import { type ReminderColDef } from "../../types/types"
import { RowActions } from "./RowActions"
import styles from "./ReminderTable.module.css"

export const columnDefs: ColDef<ReminderColDef>[] = [
	{ field: "id", headerName: "ID" },
	{
		field: "guild_name",
		headerName: "Server Name",
		headerTooltip:
			"The name of the discord guild/server which this reminder will be located within.",
	},
	{
		field: "channel_name",
		headerName: "Channel Name",
		headerTooltip: "The channel within the server which this reminder will be located within",
	},
	{
		field: "reminder_message",
		headerName: "Message",
		headerTooltip: "The message which will be sent when the reminder is triggered.",
	},
	{
		field: "time",
		headerTooltip: "The time at which the reminder will be triggered.",
		cellRenderer: (params: ICellRendererParams<ReminderColDef, Date>) => {
			if (!params.value) {
				return new Date().toLocaleString()
			}
			return params.value.toLocaleString()
		},
	},
	{
		field: "actions",
		headerName: "Actions",
		headerTooltip: "Actions which can be performed on this reminder.",
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
	tooltipValueGetter: (s) => s.value,
}
