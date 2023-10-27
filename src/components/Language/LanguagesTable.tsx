import { AgGridReact } from "ag-grid-react" // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css" // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css" // Optional theme CSS
import { type ICellRendererParams, type ColDef } from "ag-grid-community"
import { type SupportedLanguageData } from "../../types/types"
import { useRef } from "react"
import { Center, Stack, TextInput } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { TwemojiImage } from "../Tweemoji/TweemojiImage"

import styles from "./LanguagesTable.module.css"

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
		width: 100,
	},
	{
		field: "countryName",
	},
	{
		field: "name",
		headerName: "Language",
	},
	{
		field: "discordIconLabel",
	},
	{
		field: "supported",
	},
]

const defaultColDef: ColDef<SupportedLanguageData> = {
	flex: 1,
	minWidth: 100,
	resizable: false,
	sortable: true,
	filter: true,
	lockVisible: true,
}

const useInput = (initialValue = "") => {
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
		null as any as AgGridReact<SupportedLanguageData>
	)

	const { value, inputProps } = useInput()

	return (
		<Center>
			<Stack gap="xl">
				<TextInput
					styles={{ label: { color: "white" } }}
					label="Quick Filter"
					placeholder="Search the entire table..."
					w={400}
					{...inputProps}
				/>
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
						columnDefs={columnDefs}
						defaultColDef={defaultColDef}
					/>
				</div>
			</Stack>
		</Center>
	)
}
