"use client"
import { MantineProvider } from "@mantine/core"

import { type ReactNode } from "react"
import { theme } from "../theme/theme"

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<MantineProvider defaultColorScheme="dark" theme={theme}>
				{children}
			</MantineProvider>
		</>
	)
}
