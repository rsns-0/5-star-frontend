import { Card } from "@mantine/core"
import { type CardProps } from "@mantine/core/lib/components"
import styles from "./BorderCard.module.css"

export function BorderCard({ children, ...props }: CardProps) {
	return (
		<Card {...props} className={styles.card} variant="blue-border">
			{children}
		</Card>
	)
}
