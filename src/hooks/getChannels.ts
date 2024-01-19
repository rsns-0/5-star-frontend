import { ChannelDataTransformer } from "../lib/channelDataTransformer"
import { api } from "../utils/api"

export function useGetChannels() {
	const { data } = api.discordRouter.getGuildsAndTextBasedChannelsOfUser.useQuery()

	return new ChannelDataTransformer(data ?? []).transformMantineComboboxData()
}
