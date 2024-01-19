import { Button, type TooltipProps, type ButtonProps, Tooltip } from "@mantine/core"

import exportFromJSON from "export-from-json"

export interface ExportDataButtonProps {
	data: object
	buttonProps?: ButtonProps
	tooltipProps?: Partial<TooltipProps>
	exportOptions?: Omit<Parameters<typeof exportFromJSON>[0], "data">
	text?: string
}

export function ExportDataButton({
	data,
	buttonProps,
	tooltipProps,
	exportOptions,
	text = "Export CSV Data",
}: ExportDataButtonProps) {
	const exportData = () => {
		exportFromJSON({
			data,
			fileName: "exported-data",
			exportType: "csv",
			...exportOptions,
		})
	}

	return (
		<Tooltip label="Export data as a CSV file." {...tooltipProps}>
			<Button {...buttonProps} onClick={exportData}>
				{text}
			</Button>
		</Tooltip>
	)
}

export const jsonDataProps = {
	exportOptions: { exportType: "json" },
	tooltipProps: { label: "Export data as a JSON file." },
	text: "Export JSON Data",
} as const
