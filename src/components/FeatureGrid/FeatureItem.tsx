"use client"
import { Box, Card, Group } from "@mantine/core"
import React, { type ReactNode } from "react"
import { Text, ThemeIcon, rem } from "@mantine/core"
import { IconSquareCheckFilled, type TablerIconsProps } from "@tabler/icons-react"

import styles from "./FeaturesTitle.module.css"
import { TitleText } from "../typography/TitleText"

export type FeatureItemProps = {
	title: string
	description: string
	children?: ReactNode
	icon?: React.ComponentType<TablerIconsProps> | null
}
const iconProps: TablerIconsProps = {
	style: { width: rem(26), height: rem(26) },
	stroke: 1.5,
}

/** Leave icon undefined to use default. Set icon to null to have no icon. Children are aligned on right side. */
export const FeatureItem = ({
	title,
	children,
	description,
	icon: Icon = IconSquareCheckFilled,
}: FeatureItemProps) => {
	return (
		<Card className={styles.card} variant="blue-border">
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
					<TitleText fz="xl" mt="sm" fw={500}>
						{title}
					</TitleText>
				) : (
					title
				)}
			</Box>
			<Box>
				<Text fz="sm">{description}</Text>
			</Box>
			<Group justify="end" mt="lg">
				{children}
			</Group>
		</Card>
	)
}
