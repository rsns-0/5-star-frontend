import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api"

import "~/styles/globals.css"
import "@mantine/core/styles.css"
import AppProvider from "../providers/AppProvider"
import Head from "next/head"
import { Navbar } from "../components/Navbar/Navbar"
import { defaultLinks } from "../resources/links"

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<>
			<Head>
				<meta
					name="description"
					content="Ease your life with the 5 Stars Discord bot for automating tasks."
					charSet="utf-8"
				/>
				<title>5 Stars</title>
			</Head>

			<SessionProvider session={session}>
				<AppProvider>
					<Navbar links={defaultLinks} />
					<Component {...pageProps} />
				</AppProvider>
			</SessionProvider>
		</>
	)
}

export default api.withTRPC(MyApp);
