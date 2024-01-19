import { type ComboboxData } from "@mantine/core"
import { type ChannelData } from "../types/types"

export class ChannelDataTransformer {
	constructor(public data: ChannelData) {}

	public transformMantineComboboxData() {
		return this.data.map((guild) => ({
			group: guild.name,
			items: guild.discord_channels.map((channel) => ({
				value: channel.id,
				label: channel.name,
			})),
		})) satisfies ComboboxData
	}
}
