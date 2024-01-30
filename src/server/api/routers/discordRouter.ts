import { createTRPCRouter, discordUserProcedure } from "~/server/api/trpc"
import { createGetUserChannelsQuery } from "../../queries/getUserChannels"

export const discordRouter = createTRPCRouter({
	getGuildsAndTextBasedChannelsOfUser: discordUserProcedure.query(async ({ ctx }) => {
		return await createGetUserChannelsQuery(ctx.userProviderId).execute()
	}),
})
