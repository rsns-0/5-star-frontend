import { useController } from "react-hook-form"
import { useReminderDataContext } from "../contexts/reminderDataContext"
import { type DefaultUseAutocompleteProps } from "../types/types"
import { useGetChannels } from "./useReminderDatabaseService"
import { type ReminderUpdateFormData } from "../models/reminder-frontend"

function createAutocompleteProps<T>(props: DefaultUseAutocompleteProps<T>) {
	return props
}

export default function useChannelSelection() {
	const {
		discord_channels: { id },
	} = useReminderDataContext()

	const channels = useGetChannels()

	const control = useController<ReminderUpdateFormData>({ name: "channel_id" })

	const dropdownProps = createAutocompleteProps({
		options: channels.map((channel) => channel.id),
		getOptionLabel: (opt) => channels.find((channel) => channel.id === opt)?.guildName ?? "",
		groupBy: (opt) => channels.find((channel) => channel.id === opt)?.guildName ?? "",
		defaultValue: id,
		onChange: (_, value) => {
			control.field.onChange(value)
		},
		value: id,
	})
	return dropdownProps
}
