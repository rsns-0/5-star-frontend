import { createTRPCRouter, discordUserProcedure } from "~/server/api/trpc"

export const discordRouter = createTRPCRouter({
	getGuildsAndTextBasedChannelsOfUser: discordUserProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.discord_channels.getGuildsAndTextBasedChannelsOfUser(
			ctx.userProviderId
		)

		return res.flatMap((guild) => {
			return guild.discord_channels.map((channel) => ({
				id: channel.id,
				name: channel.name,
				guildName: guild.name,
			}))
		})
	}),
})
