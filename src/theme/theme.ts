import { Divider, createTheme } from "@mantine/core"

export const theme = createTheme({
	components: {
		Divider: Divider.extend({
			defaultProps: {
				color: "blue.8",
				variant: "solid",
			},
		}),
	},
})
