import { Stack, Text } from "@mantine/core"
import styles from "./MainSection.module.css"

import React, { type ReactNode } from "react"

type MainSectionProps = {
	titleText?: string
	bodyText?: string
	children?: ReactNode
}

const MainSection = ({
	titleText = "5-star service at your fingertips.",
	bodyText = "5-stars automates your daily tasks and comes with additional features.",
	children,
}: MainSectionProps) => {
	return (
		<Stack>
			<Text className={styles.title}>{titleText}</Text>
			<Text size="lg">{bodyText}</Text>
			{children}
		</Stack>
	)
}

export default MainSection
