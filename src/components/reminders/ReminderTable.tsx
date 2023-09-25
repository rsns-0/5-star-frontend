import { Button, Stack } from "@mui/material"
import { type ColDef, type ICellRendererParams } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { useMemo, useRef } from "react"
import { useTable } from "../../hooks/useTable"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { dateConverter } from "../../models/date-converter"
import { type reminders } from "@prisma/client"
import { type DateTime } from "luxon"
import DatePickerMUI from "./DatePickerMUI"
import { type IReminderFrontendData } from "../../models/reminder-frontend"

function Def(field: keyof reminders, props: ColDef = {}) {
	const res: typeof props = {
		field,
		sortable: true,
		editable: true,
		filter: true,
		resizable: true,

		lockPosition: true,
		...props,
	}
	return res
}

export default function ReminderTable() {
	// hooks
	const gridRef = useRef<AgGridReact<IReminderFrontendData>>(null)

	const { handleCellChange, handleDeleteClick, data } = useTable(gridRef)
	// const res = data!.findIndex((item) => item.id === BigInt(297))
	// data![res]!.reminder_message = "test123"

	const columnDefs = useMemo((): ColDef<IReminderFrontendData>[] => {
		return [
			Def("id", { checkboxSelection: true, maxWidth: 120, editable: false }),
			Def("time", {
				sortable: true,
				filter: "datetime",
				cellRenderer(params: ICellRendererParams<IReminderFrontendData, DateTime | null>) {
					return dateConverter.formatDate(params.value)
				},
				editable: true,
				initialWidth: 10,
				cellEditor: DatePickerMUI,
				// onCellValueChanged: validateStartDate,

				lockVisible: true,
			}),
			Def("reminder_message", { headerName: "Message" }),
			// Def("channel_id"),
			// Def("created_at", { editable: false }),
			// Def("webhook_id"),
			// Def("user_id", { editable: false }),
		]
	}, [])

	return (
		<>
			<Stack direction="column" justifyContent={"flex-start"} spacing={4}>
				<Stack width="fit-content" direction="row" spacing={4}>
					{/* <Button variant="contained">Create</Button> */}
					<Button variant="contained" onClick={handleDeleteClick}>
						Delete
					</Button>
				</Stack>
				<div id="gridContainer" className="ag-theme-alpine-dark" style={{ height: 1000 }}>
					<AgGridReact<IReminderFrontendData>
						rowData={data}
						columnDefs={columnDefs}
						ref={gridRef}
						pagination
						paginationPageSize={25}
						rowSelection="multiple"
						getRowId={(params) => params.data.id.toString()}
						onCellValueChanged={handleCellChange}
						onGridSizeChanged={(params) => params.api.sizeColumnsToFit()}
					/>
				</div>
			</Stack>
		</>
	)
}
