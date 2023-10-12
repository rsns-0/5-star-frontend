"use client"
import { SessionProvider } from "next-auth/react"
import AppProvider from "../providers/AppProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<AppProvider>
				<html lang="en">
					<body>{children}</body>
				</html>
			</AppProvider>
		</SessionProvider>
	)
}
