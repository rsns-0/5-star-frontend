import { Button as Mb1 } from "@mui/material"
import React from "react"

interface ButtonProps {
	color?: "primary" | "secondary" | "success" | "inherit" | "error" | "info" | "warning"

	/**
	 * What background color to use
	 */
	backgroundColor?: string
	/**
	 * How large should the button be?
	 */
	size?: "small" | "medium" | "large"
	/**
	 * Button contents
	 */
	label: string
	variant?: "contained" | "outlined" | "text"

	/**
	 * Optional click handler
	 */
	onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, ...props }: ButtonProps) => {
	return (
		<Mb1 type="button" {...props}>
			{label}
		</Mb1>
	)
}
