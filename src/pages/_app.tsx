import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api"
import "~/styles/globals.css"
import MuiProvider from "../providers/mui-provider"
import SuperJSON from "superjson"
import { DateTime } from "luxon"

SuperJSON.registerCustom<DateTime, string>(
	{
		isApplicable: (v): v is DateTime => DateTime.isDateTime(v),
		serialize: (v) => v.toJSON() ?? "",
		deserialize: (v) => DateTime.fromISO(v),
	},
	"DateTime"
)

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<MuiProvider>
				<Component {...pageProps} />
			</MuiProvider>
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp);
