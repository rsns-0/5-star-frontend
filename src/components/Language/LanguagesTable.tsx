import { AgGridReact } from "ag-grid-react" // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css" // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css" // Optional theme CSS
import { type ICellRendererParams, type ColDef } from "ag-grid-community"
import { type SupportedLanguageData } from "../../types/types"
import { useRef } from "react"
import { Button, Center, Group, Stack, TextInput, Tooltip } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { TwemojiImage } from "../Tweemoji/TweemojiImage"

import styles from "./LanguagesTable.module.css"
import { ExportDataButton, jsonDataProps } from "../buttons/ExportDataButton"

type LanguagesTableProps = {
	data: SupportedLanguageData[]
}

const columnDefs: ColDef<SupportedLanguageData>[] = [
	{
		field: "icon",
		cellRenderer: (params: ICellRendererParams<SupportedLanguageData, string>) => {
			return params.value && <TwemojiImage emoji={params.value} />
		},
		filter: false,
		sortable: false,
		headerTooltip: "Icon of the country's flag.",
		width: 100,
	},
	{
		field: "id",
		headerTooltip: "The ID of the country.",
		sortable: false,
	},
	{
		field: "countryName",
		headerTooltip: "The name of the country.",
	},
	{
		field: "language",
		headerTooltip: "The name of the language.",
	},
	{
		field: "discordIconLabel",
		headerTooltip: "The Discord emoji label for the language.",
	},
	{
		field: "ISO1",
		headerTooltip: "The ISO 639-1 code for the language.",
	},
	{
		field: "ISO2",
		headerTooltip: "The ISO 639-2 code for the language.",
	},
	{
		field: "ISO2B",
		headerTooltip: "The ISO 639-2/B code for the language.",
	},
	{
		field: "CCA2",
		headerTooltip: "The ISO 3166-1 alpha-2 code for the country.",
	},
	{
		field: "CCA3",
		headerTooltip: "The ISO 3166-1 alpha-3 code for the country.",
	},

	{
		field: "weight",
		headerTooltip:
			"Reflects the confidence that the language is the primary language of the country. Records with higher scores are more likely to be accurate and less volatile to change.",
	},
	{
		field: "supported",
		headerTooltip: "Whether the language can be translated.",
	},
]

const defaultColDef: ColDef<SupportedLanguageData> = {
	flex: 1,
	minWidth: 100,
	resizable: true,
	sortable: true,
	filter: true,
	lockVisible: false,
	tooltipValueGetter: (s) => s.value,
}

const useQuickFilterInput = (initialValue = "") => {
	const [value, setValue] = useInputState(initialValue)

	const inputProps = {
		value,
		onChange: setValue,
	}

	return {
		value,
		setValue,
		inputProps,
	}
}

export const LanguagesTable = ({ data }: LanguagesTableProps) => {
	const gridRef = useRef<AgGridReact<SupportedLanguageData>>(
		null as unknown as AgGridReact<SupportedLanguageData>
	)

	const { value, inputProps, setValue } = useQuickFilterInput()

	const onRevealClick = () => {
		gridRef.current.columnApi.setColumnsVisible(
			columnDefs.map((s) => s.field!),
			true
		)
	}

	const onResetFilterClick = () => {
		gridRef.current.api.setFilterModel(null)
		setValue("")
	}

	return (
		<Center>
			<Stack gap="xl">
				<Group align="end">
					<TextInput
						styles={{ label: { color: "white" } }}
						label="Quick Filter"
						placeholder="Search the entire table..."
						w={400}
						{...inputProps}
					/>
					<ExportDataButton data={data} />
					<ExportDataButton data={data} {...jsonDataProps} />
					<Tooltip label="Reveals all columns that were hidden through drag and drop.">
						<Button onClick={onRevealClick}>Reveal Columns</Button>
					</Tooltip>
					<Tooltip label="Resets all filters.">
						<Button onClick={onResetFilterClick}>Reset filters</Button>
					</Tooltip>
				</Group>

				<div className={`ag-theme-alpine-dark ${styles.tableContainer}`}>
					<AgGridReact<SupportedLanguageData>
						ref={gridRef}
						pagination={true}
						onGridReady={(e) => {
							e.api.sizeColumnsToFit({
								columnLimits: [
									{ key: "icon", maxWidth: 10 },
									{ key: "supported", maxWidth: 120 },
								],
							})
						}}
						ensureDomOrder={true}
						quickFilterText={value}
						rowData={data}
						tooltipShowDelay={400}
						enableCellTextSelection={true}
						columnDefs={columnDefs}
						defaultColDef={defaultColDef}
					/>
				</div>
			</Stack>
		</Center>
	)
}
