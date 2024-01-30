import { db2 } from "../db2"

export function createGetUserChannelsQuery(userId: string) {
	const guilds = db2
		.selectFrom("discord_guilds")
		.select(["id", "name", "iconURL as icon_url"])
		.innerJoin("_discord_guilds_members", "discord_guilds.id", "_discord_guilds_members.A")
		.where("_discord_guilds_members.B", "=", userId)

	return db2
		.selectFrom(guilds.as("g"))
		.innerJoinLateral(
			(eb) =>
				eb
					.selectFrom("discord_channels")
					.select(["id", "name"])
					.whereRef("discord_channels.discord_guild_id", "=", "g.id")
					.orderBy("discord_channels.name")
					.as("dc"),
			(join) => join.onTrue()
		)
		.select([
			"g.id",
			"g.name",
			"g.icon_url",
			(eb) => eb.fn.jsonAgg("dc").as("discord_channels"),
		])
		.groupBy(["g.id", "g.name", "g.icon_url"])
		.orderBy(["g.name"])
		.limit(10000)
}
