import React from "react"
import { FaAngleDown } from "react-icons/fa6"
import { Button } from "@mantine/core"

type SimpleButtonType = {
	children?: React.ReactNode
}

export const SelectionButton = ({ children }: SimpleButtonType) => {
	return (
		<>
			<Button
				justify="space-between"
				fullWidth
				rightSection={<FaAngleDown />}
				color="#323232"
				styles={{
					root: {
						width: "200px",
					},
				}}
			>
				{children}
			</Button>
		</>
	)
}
