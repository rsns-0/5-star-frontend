import type { Meta, StoryObj } from "@storybook/react"
import { StorybookTrpcProvider } from "../utils/storyApi"

import { DataViewListItem } from "../components/reminders/DataViewListItem"

const mockData = {
	discord_channels: {
		discord_guilds: {
			name: "My Guild",
		},
		id: "123",
		name: "My Channel",
	},
	id: 1,
	channel_id: "456",
	reminder_message: "Don't forget to submit your report!",
	time: new Date(),
}

const meta: Meta<typeof DataViewListItem> = {
	title: "components/DataViewListItem",
	tags: ["autodocs"],
	component: DataViewListItem,
	decorators: [
		(Story) => (
			<StorybookTrpcProvider>
				<Story />
			</StorybookTrpcProvider>
		),
	],
}

export default meta

export type Story = StoryObj<typeof meta>

export const Primary: Story = {
	render: () => {
		return <DataViewListItem data={mockData} />
	},
}
