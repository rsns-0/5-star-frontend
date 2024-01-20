import { AgGridReact } from "ag-grid-react" // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css" // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css" // Optional theme CSS

import { useCallback, useRef } from "react"
import { Button, Center, Group, Stack, Tooltip } from "@mantine/core"

import styles from "./ReminderTable.module.css"
import { type ReminderData } from "../../types/types"

import { columnDefs, defaultColDef } from "./columnDefs"
import { withReminderFormProvider } from "../../providers/ReminderFormProvider"
import { useDebouncedValue } from "@mantine/hooks"

import { ReminderTableModal } from "./ReminderTableModal"
import { observer } from "mobx-react"
import { useOpenReminderTableCreateModal } from "../../hooks/reminderTable"
import { ExportDataButton, jsonDataProps } from "../../components/buttons/ExportDataButton"
import { QuickFilterInput, useQuickFilterInput } from "../../components/input/QuickFilterInput"

type ReminderTableProps = {
	data: ReminderData[]
}

const _ReminderTable = ({ data }: ReminderTableProps) => {
	const gridRef = useRef<AgGridReact<ReminderData>>(null as unknown as AgGridReact<ReminderData>) // assuming it is used only in a handler

	const { value, inputProps, setValue } = useQuickFilterInput()
	const [debouncedValue] = useDebouncedValue(value, 250)

	const autoSizeStaticColumns = useCallback(() => {
		gridRef.current.columnApi.autoSizeColumns(["id", "actions"])
	}, [])

	const resetColumns = useCallback(() => {
		gridRef.current.columnApi.resetColumnState()
		autoSizeStaticColumns()
		gridRef.current.api.setFilterModel(null)
		setValue("")
	}, [autoSizeStaticColumns, setValue])

	const onGridReady = useCallback(() => {
		autoSizeStaticColumns()
	}, [autoSizeStaticColumns])

	const openNew = useOpenReminderTableCreateModal()

	return (
		<>
			<Center>
				<Stack gap="xl">
					<Group align="end">
						<QuickFilterInput data-testid="quick filter" {...inputProps} />
						<Tooltip label="Resets filters and column positions.">
							<Button data-testid="reset columns" onClick={resetColumns}>
								Reset Columns
							</Button>
						</Tooltip>
						<Tooltip label="Creates a new reminder.">
							<Button data-testid="create new" onClick={openNew}>
								Create New
							</Button>
						</Tooltip>
						<ExportDataButton data={data} {...jsonDataProps} />
					</Group>

					<div className={`ag-theme-alpine-dark ${styles.tableContainer}`}>
						<AgGridReact<ReminderData>
							ref={gridRef}
							pagination={true}
							ensureDomOrder={true}
							quickFilterText={debouncedValue}
							rowData={data}
							tooltipShowDelay={400}
							columnDefs={columnDefs}
							defaultColDef={defaultColDef}
							onGridReady={onGridReady}
						/>
					</div>
				</Stack>
			</Center>
			<ReminderTableModal />
		</>
	)
}

export const ReminderTable = withReminderFormProvider(observer(_ReminderTable))
