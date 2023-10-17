import { Box, Card } from "@mantine/core"
import React, { type ReactNode } from "react"
import { Text, ThemeIcon, rem } from "@mantine/core"
import { IconSquareCheckFilled, type TablerIconsProps } from "@tabler/icons-react"

export type FeatureItemProps = {
	title: string | ReactNode
	description: string
	children?: ReactNode
	icon?: React.ComponentType<TablerIconsProps> | null
}
const iconProps: TablerIconsProps = {
	style: { width: rem(26), height: rem(26) },
	stroke: 1.5,
}

/** Leave icon undefined to use default. Set icon to null to have no icon. */
export const FeatureItem = ({
	title,
	children,
	description,
	icon: Icon = IconSquareCheckFilled,
}: FeatureItemProps) => {
	return (
		<Card className="bg-red-800 text-red-600" variant="blue-border">
			<Box>
				{Icon && (
					<ThemeIcon
						size={44}
						radius="md"
						variant="gradient"
						gradient={{ deg: 133, from: "blue", to: "cyan" }}
					>
						<Icon {...iconProps} />
					</ThemeIcon>
				)}
			</Box>

			<Box>
				{typeof title === "string" ? (
					<Text fz="lg" mt="sm" fw={500}>
						{title}
					</Text>
				) : (
					title
				)}
			</Box>
			<Box>
				<Text c="dimmed" fz="sm">
					{description}
				</Text>
			</Box>
			{children}
		</Card>
	)
}