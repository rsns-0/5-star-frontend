import { Divider, Title } from "@mantine/core"
import styles from "./titleWithDivider.module.css"
import React from "react"

type TitleWithDividerProps = {
	children: React.ReactNode
	icon?: JSX.Element
	divider?: boolean
	order?: 1 | 2 | 3 | 4 | 5 | 6 // ugly but...
	iconSize?: number
	iconColor?: string // needs better color type
}

const TitleWithDivider = ({
	children,
	icon,
	divider = false,
	order = 1,
	iconSize,
	iconColor,
}: TitleWithDividerProps) => {
	return (
		<div className={styles.div}>
			<div className={styles.titleContainer}>
				{icon && (
					<div className={styles.icon}>
						{React.cloneElement(icon, { size: iconSize, color: iconColor })}
					</div>
				)}
				<Title order={order} mt="xl">
					{children}
				</Title>
			</div>
			{divider && <Divider size="md" color="blue.8" mb="xl" />}
		</div>
	)
}

export default TitleWithDivider
