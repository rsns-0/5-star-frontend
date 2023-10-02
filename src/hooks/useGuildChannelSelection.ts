import { useState } from "react"

export function useGuildChannelSelection<TData extends Record<string, any>, TChannel>(
	data: TData[],
	channelAccessor: (data: TData) => TChannel[]
) {
	// const [selectedGuild, setSelectedGuild] = [
	// 	channelSelectionStore.use.selectedGuild(),
	// 	channelSelectionStore.set.selectedGuild,
	// ]
	// const [selectedChannel, setSelectedChannel] = [
	// 	channelSelectionStore.use.selectedChannel(),
	// 	channelSelectionStore.set.selectedChannel,
	// ]

	const [selectedGuild, setSelectedGuild] = useState<(typeof data)[0] | null>(null)
	const [selectedChannel, setSelectedChannel] = useState<TChannel | null>(null)

	const guildOptions = data ?? []

	const channelOptions = selectedGuild ? channelAccessor(selectedGuild) : []

	return {
		selectedGuild,
		setSelectedGuild,
		selectedChannel,
		setSelectedChannel,
		guildOptions,
		channelOptions,
	}
}
