import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { api } from "~/utils/api"

import "~/styles/globals.css"
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider theme={darkTheme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp);
