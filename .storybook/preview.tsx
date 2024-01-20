import type { Preview } from "@storybook/react"
import AppProvider from "../src/providers/AppProvider"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
import React from "react"
const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => {
			return (
				<AppProvider>
					<Story />
				</AppProvider>
			)
		},
	],
}

export default preview
