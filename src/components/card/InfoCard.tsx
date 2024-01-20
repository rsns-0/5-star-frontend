import { Paper, type PaperProps, Text, ThemeIcon, rem } from "@mantine/core"
import { IconInfoHexagonFilled } from "@tabler/icons-react"
import classes from "./InfoCard.module.css"
import { type ReactNode } from "react"

interface InfoCardProps {
	paperProps?: PaperProps
	header?: ReactNode
	body?: ReactNode
	icon?: ReactNode
}

const defaultInfoCardIcon = (
	<IconInfoHexagonFilled style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
)

export default function InfoCard({
	paperProps,
	header,
	body,
	icon = defaultInfoCardIcon,
}: InfoCardProps) {
	return (
		<Paper withBorder radius="md" className={classes.card} {...paperProps}>
			<ThemeIcon size="xl" radius="md" variant="outline">
				{icon}
			</ThemeIcon>
			<Text size="xl" fw={500} mt="md">
				{header}
			</Text>
			<Text size="sm" mt="sm" c="white">
				{body}
			</Text>
		</Paper>
	)
}
