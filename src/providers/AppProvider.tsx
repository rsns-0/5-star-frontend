"use client"
import { MantineProvider } from "@mantine/core"

import { type ReactNode } from "react"
import { theme } from "../theme/theme"
import { DatesProvider } from "@mantine/dates"
import customParseFormat from "dayjs/plugin/customParseFormat"
import dayjs from "dayjs"
import "dayjs/locale/en"
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<DatesProvider settings={{ locale: "en" }}>
				<MantineProvider defaultColorScheme="dark" theme={theme}>
					{children}
				</MantineProvider>
			</DatesProvider>
		</>
	)
}
