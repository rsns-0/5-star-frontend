import { AgGridReact } from "ag-grid-react" // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css" // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css" // Optional theme CSS

import { useCallback, useRef } from "react"
import { Button, Group, Stack } from "@mantine/core"

import styles from "./ReminderTable.module.css"
import { type ReminderData } from "../../types/types"
import { useInput } from "../../hooks/useInput"
import { columnDefs, defaultColDef } from "./columnDefs"
import { withReminderFormProvider } from "../../providers/ReminderFormProvider"
import { useDebouncedValue } from "@mantine/hooks"
import { QuickFilterInput } from "../../components/QuickFIlterInput/QuickFilterInput"

type ReminderTableProps = {
	data: ReminderData[]
}

const _ReminderTable = ({ data }: ReminderTableProps) => {
	const { gridRef, onGridReady, resetColumns, inputProps, debouncedInputValue } = useTable()

	return (
		<Stack gap="md">
			<Group align="end" ml="lg">
				<QuickFilterInput {...inputProps} />
				<Button onClick={resetColumns}>Reset columns</Button>
			</Group>

			<div className={`ag-theme-alpine-dark ${styles.tableContainer}`}>
				<AgGridReact<ReminderData>
					ref={gridRef}
					pagination={true}
					ensureDomOrder={true}
					quickFilterText={debouncedInputValue}
					rowData={data}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					onGridReady={onGridReady}
				/>
			</div>
		</Stack>
	)
}

export const ReminderTable = withReminderFormProvider(_ReminderTable)

const useTable = () => {
	const gridRef = useRef<AgGridReact<ReminderData>>(null as any as AgGridReact<ReminderData>) // assuming it is used only in a handler

	const { value, inputProps, setValue } = useInput()
	const [debouncedValue] = useDebouncedValue(value, 400)

	const autoSizeStaticColumns = useCallback(() => {
		gridRef.current.columnApi.autoSizeColumns(["id", "actions"])
	}, [])

	const resetColumns = useCallback(() => {
		gridRef.current.columnApi.resetColumnState()
		autoSizeStaticColumns()
		setValue("")
	}, [autoSizeStaticColumns, setValue])

	const onGridReady = useCallback(() => {
		autoSizeStaticColumns()
	}, [autoSizeStaticColumns])

	return {
		gridRef,
		inputProps,
		debouncedInputValue: debouncedValue,
		resetColumns,
		autoSizeStaticColumns,
		onGridReady,
	}
}
