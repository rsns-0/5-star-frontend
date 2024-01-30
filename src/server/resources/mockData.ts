import { type ChannelData, type ReminderData } from "../../types/types"

export const mockReminderData: ReminderData[] = [
	{
		channel_id: "channel1",
		channel_name: "Channel 1",
		guild_id: "guild1",
		guild_name: "Guild 1",
		id: 1,
		reminder_message: "Reminder 1",
		time: new Date("2024-01-28T09:00:00"),
	},
	{
		channel_id: "channel2",
		channel_name: "Channel 2",
		guild_id: "guild2",
		guild_name: "Guild 2",
		id: 2,
		reminder_message: "Reminder 2",
		time: new Date("2024-01-28T10:00:00"),
	},
	{
		channel_id: "channel3",
		channel_name: "Channel 3",
		guild_id: "guild3",
		guild_name: "Guild 3",
		id: 3,
		reminder_message: "Reminder 3",
		time: new Date("2024-01-28T11:00:00"),
	},
	{
		channel_id: "channel4",
		channel_name: "Channel 4",
		guild_id: "guild4",
		guild_name: "Guild 4",
		id: 4,
		reminder_message: "Reminder 4",
		time: new Date("2024-01-28T12:00:00"),
	},
	{
		channel_id: "channel5",
		channel_name: "Channel 5",
		guild_id: "guild5",
		guild_name: "Guild 5",
		id: 5,
		reminder_message: "Reminder 5",
		time: new Date("2024-01-28T13:00:00"),
	},
]

export const mockChannelData: ChannelData = [
	{
		discord_channels: [
			{
				id: "channel1",
				name: "Channel 1",
			},
		],
		id: "1",
		name: "Name 1",
		icon_url: "https://cdn.discordapp.com/icons/1/1.png",
	},
	{
		discord_channels: [
			{
				id: "channel2",
				name: "Channel 2",
			},
		],
		id: "2",
		name: "Name 2",
		icon_url: "https://cdn.discordapp.com/icons/1/1.png",
	},
	{
		discord_channels: [
			{
				id: "channel3",
				name: "Channel 3",
			},
		],
		id: "3",
		name: "Name 3",
		icon_url: "https://cdn.discordapp.com/icons/1/1.png",
	},
	{
		discord_channels: [
			{
				id: "channel4",
				name: "Channel 4",
			},
		],
		id: "4",
		name: "Name 4",
		icon_url: "https://cdn.discordapp.com/icons/1/1.png",
	},
	{
		discord_channels: [
			{
				id: "channel5",
				name: "Channel 5",
			},
		],
		id: "5",
		name: "Name 5",
		icon_url: "https://cdn.discordapp.com/icons/1/1.png",
	},
]
