import { type ChannelData, type ReminderData } from "../../types/types"

export const mockReminderData: ReminderData[] = [
	{
		time: new Date(),
		channel_id: "channel1",
		reminder_message: "Reminder 1",
		discord_channels: {
			name: "Channel 1",
			discord_guilds: {
				name: "Guild 1",
			},
			id: "1",
		},
		id: 1,
	},
	{
		time: new Date(),
		channel_id: "channel2",
		reminder_message: "Reminder 2",
		discord_channels: {
			name: "Channel 2",
			discord_guilds: {
				name: "Guild 2",
			},
			id: "2",
		},
		id: 2,
	},
	{
		time: new Date(),
		channel_id: "channel3",
		reminder_message: "Reminder 3",
		discord_channels: {
			name: "Channel 3",
			discord_guilds: {
				name: "Guild 3",
			},
			id: "3",
		},
		id: 3,
	},
	{
		time: new Date(),
		channel_id: "channel4",
		reminder_message: "Reminder 4",
		discord_channels: {
			name: "Channel 4",
			discord_guilds: {
				name: "Guild 4",
			},
			id: "4",
		},
		id: 4,
	},
	{
		time: new Date(),
		channel_id: "channel5",
		reminder_message: "Reminder 5",
		discord_channels: {
			name: "Channel 5",
			discord_guilds: {
				name: "Guild 5",
			},
			id: "5",
		},
		id: 5,
	},
]

export const mockChannelData: ChannelData = [
	{
		discord_channels: [
			{
				webhooks: [
					{
						id: "webhook1",
					},
				],
				id: "channel1",
				name: "Channel 1",
			},
		],
		id: "1",
		name: "Name 1",
	},
	{
		discord_channels: [
			{
				webhooks: [
					{
						id: "webhook2",
					},
				],
				id: "channel2",
				name: "Channel 2",
			},
		],
		id: "2",
		name: "Name 2",
	},
	{
		discord_channels: [
			{
				webhooks: [
					{
						id: "webhook3",
					},
				],
				id: "channel3",
				name: "Channel 3",
			},
		],
		id: "3",
		name: "Name 3",
	},
	{
		discord_channels: [
			{
				webhooks: [
					{
						id: "webhook4",
					},
				],
				id: "channel4",
				name: "Channel 4",
			},
		],
		id: "4",
		name: "Name 4",
	},
	{
		discord_channels: [
			{
				webhooks: [
					{
						id: "webhook5",
					},
				],
				id: "channel5",
				name: "Channel 5",
			},
		],
		id: "5",
		name: "Name 5",
	},
]
