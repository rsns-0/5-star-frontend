import { createTRPCRouter, discordUserProcedure } from "~/server/api/trpc"
import { mockChannelData } from "../../resources/mockData"

export const discordRouter = createTRPCRouter({
	getGuildsAndTextBasedChannelsOfUser: discordUserProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.discord_guilds.findMany({
			where: {
				members: {
					some: {
						id: ctx.userProviderId,
					},
				},
			},
			select: {
				discord_channels: {
					select: {
						id: true,
						name: true,
						webhooks: {
							select: {
								id: true,
							},
						},
					},
					where: {
						webhooks: {
							some: {},
						},
					},
				},
				id: true,
				name: true,
			},
			take: 10000,
		})

		return res
	}),
})

export const mockDiscordRouter = createTRPCRouter({
	getGuildsAndTextBasedChannelsOfUser: discordUserProcedure.query(() => {
		const res: {
			name: string
			discord_channels: {
				name: string
				webhooks: {
					id: string
				}[]
				id: string
			}[]
			id: string
		}[] = mockChannelData
		return res
	}),
})

