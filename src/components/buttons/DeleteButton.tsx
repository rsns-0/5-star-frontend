import { ActionIcon } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"

import { type IconButtonProps } from "../../types/types"

export const DeleteButton = ({ iconProps, ...props }: IconButtonProps) => {
	return (
		<ActionIcon
			variant="gradient"
			size="md"
			gradient={{ from: "red", to: "rgba(112, 0, 0, 1)", deg: 90 }}
			title="Delete"
			aria-label="Delete"
			{...props}
		>
			<IconTrash {...iconProps} />
		</ActionIcon>
	)
}
