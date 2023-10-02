import {
	type Components,
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from "@mui/material/styles"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { type ReactNode } from "react"
import CssBaseline from "@mui/material/CssBaseline"

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
}

let darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	components: defaultComponentProps,
})
darkTheme = responsiveFontSizes(darkTheme)

export default function MuiProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
		</ThemeProvider>
	)
}
