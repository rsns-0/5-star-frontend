import { api } from "../utils/api"
import { type ComboboxItem } from "@mantine/core"


function remapToMantineItem(data: { id: string; name: string }): ComboboxItem {
	return { value: data.id, label: data.name }
}

export function useChannels() {
	const { data = [] } = api.discordRouter.getGuildsAndTextBasedChannelsOfUser.useQuery()

	const guilds = data.map(remapToMantineItem)

	const getChannels = (guildId: string) => {
		const channelData = data.find((guild) => guild.id === guildId)?.discord_channels ?? []
		return channelData.map(remapToMantineItem)
	}

	

	return { data, guilds, getChannels }
}
