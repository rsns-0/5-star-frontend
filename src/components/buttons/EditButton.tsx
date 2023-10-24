import { ActionIcon } from "@mantine/core"
import { IconPencil } from "@tabler/icons-react"

import { type IconButtonProps } from "../../types/types"

export const EditButton = ({ iconProps, ...props }: IconButtonProps) => {
	return (
		<ActionIcon
			variant="gradient"
			size="md"
			gradient={{ from: "blue", to: "cyan", deg: 80 }}
			title="Edit"
			aria-label="Edit"
			{...props}
		>
			<IconPencil {...iconProps} />
		</ActionIcon>
	)
}
