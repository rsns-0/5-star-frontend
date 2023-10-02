import type { Meta, StoryObj } from "@storybook/react"
import DataViewListItem from "../components/reminders/DataViewListItem"
import { type GetRemindersOutput } from "../types/router"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "Comp/DataViewListItem",
	component: DataViewListItem,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} satisfies Meta<typeof DataViewListItem>
const mockData: GetRemindersOutput = {
	channel_name: "Channel 1",
	guild_name: "Guild 1",
	id: 303,
	created_at: new Date("2022-01-01T00:00:00Z"),
	user_id: "1234567890",
	channel_id: "1234567890",
	reminder_message: "Reminder message",
	webhook_id: "1234567890",
	time: new Date("2022-01-02T00:00:00Z"),
}
export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		data: mockData,
		onBlurHandler: (val) => console.log(val),
	},
}
