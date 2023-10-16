"use client"
import { MantineProvider } from "@mantine/core"
import { type Components, createTheme, responsiveFontSizes } from "@mui/material/styles"

import { type ReactNode } from "react"

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		delete: true
	}
}

const defaultComponentProps: Components = {
	MuiStack: {
		defaultProps: {
			spacing: 4,
		},
	},
	MuiTextField: {
		defaultProps: {
			size: "small",
			margin: "dense",
		},
	},
	MuiButton: {
		variants: [
			{
				props: { variant: "delete" },
				style: {
					color: "#fff",
					backgroundColor: "#f44336",
					outline: "none",
				},
			},
		],
	},
}

let darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	components: defaultComponentProps,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
darkTheme = responsiveFontSizes(darkTheme)

// function MuiProvider({ children }: { children: ReactNode }) {
// 	return (
// 		<ThemeProvider theme={darkTheme}>
// 			<CssBaseline />
// 			<LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
// 		</ThemeProvider>
// 	)
// }

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<MantineProvider>{children}</MantineProvider>
		</>
	)
}
