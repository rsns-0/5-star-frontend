import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api"
import { Analytics } from "@vercel/analytics/react"

import "~/styles/globals.css"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
import AppProvider from "../providers/AppProvider"
import Head from "next/head"
import { Navbar } from "../components/Navbar/Navbar"
import { defaultLinks } from "../resources/links"
import { Header } from "../components/Header/Header"

import { Notifications } from "@mantine/notifications"
import { SpeedInsights } from "@vercel/speed-insights/next"

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<>
			<Head>
				<meta
					name="description"
					content="5 Stars provides data and services related to languages, countries, and time."
					charSet="utf-8"
				/>
				<title>5 Stars</title>
			</Head>
			<Analytics />
			<SpeedInsights />

			<SessionProvider session={session}>
				<AppProvider>
					<Notifications />
					<Navbar links={defaultLinks} />
					<Header links={defaultLinks} />
					<Component {...pageProps} />
				</AppProvider>
			</SessionProvider>
		</>
	)
}

export default api.withTRPC(MyApp);
