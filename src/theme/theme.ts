"use client"
import { Card, Divider, List, Text, Title, createTheme } from "@mantine/core"

import cardClasses from "./Card.module.css"

declare module "@mantine/core" {
	export interface CardProps {
		variant?: "blue-border"
	}
}

const defaultTextColor = {
	c: "white",
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
		Text: Text.extend({
			defaultProps: { ...defaultTextColor },
		}),
		ListItem: List.Item.extend({
			defaultProps: { ...defaultTextColor },
		}),
		Title: Title.extend({
			defaultProps: { ...defaultTextColor },
		}),
	},
})
