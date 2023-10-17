import { Card, Stack, Text, Title } from "@mantine/core"
import styles from "./MainContent.module.css"

import { type ReactNode } from "react"

type MainSectionProps = {
	titleText: string
	bodyText: string
	children?: ReactNode
}
/** Children are rendered below the body text. */
const MainSection = ({ titleText, bodyText, children }: MainSectionProps) => {
	return (
		<Card shadow="sm" padding="lg" variant="blue-border">
			<Stack>
				<Title className={styles.title}>{titleText}</Title>
				<Text size="lg">{bodyText}</Text>
				{children}
			</Stack>
		</Card>
	)
}

export default MainSection
