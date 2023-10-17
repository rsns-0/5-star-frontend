import { Card, Divider, createTheme } from "@mantine/core"

import cardClasses from "./Card.module.css"

declare module "@mantine/core" {
	export interface CardProps {
		variant?: "blue-border"
	}
}

export const theme = createTheme({
	components: {
		Divider: Divider.extend({
			defaultProps: {
				variant: "solid",
			},
		}),
		Card: Card.extend({
			classNames: cardClasses,
		}),
	},
})
