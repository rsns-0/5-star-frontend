import { ModeEdit } from "@mui/icons-material"
import { Button } from "@mui/material"
import { type ComponentProps } from "react"
import { type O } from "ts-toolbelt"

type EditButtonProps = O.Required<ComponentProps<typeof Button>, "onClick">

export default function EditButton({ onClick, ...rest }: EditButtonProps) {
	return (
		<Button
			variant="outlined"
			title="EDIT"
			startIcon={<ModeEdit />}
			onClick={onClick}
			{...rest}
		>
			Edit
		</Button>
	)
}
