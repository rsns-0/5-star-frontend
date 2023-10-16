import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api"

import "~/styles/globals.css"
import "@mantine/core/styles.css"
import AppProvider from "../providers/AppProvider"

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<AppProvider>
				<Component {...pageProps} />
			</AppProvider>
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp);
