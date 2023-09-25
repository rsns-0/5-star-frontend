"use client"

import { ThemeProvider, createTheme } from "@mui/material/styles"

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { type ReactNode } from "react"

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})

export default function MuiProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider theme={darkTheme}>
			<LocalizationProvider dateAdapter={AdapterLuxon}>{children}</LocalizationProvider>
		</ThemeProvider>
	)
}
