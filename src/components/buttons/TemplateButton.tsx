import { Button } from "@mantine/core"
import React from "react"

type SimpleButtonType = {
	children?: React.ReactNode
	color?: string
}

export const SimpleButton = ({ children, color }: SimpleButtonType) => {
	return (
		<Button variant="filled" color={color}>
			{children}
		</Button>
	)
}
