import { useController } from "react-hook-form"

import { type DefaultUseAutocompleteProps } from "../types/types"
import { useGetChannels } from "./useReminderDatabaseService"
import { type ReminderUpdateFormData } from "../models/reminder-frontend"

function createAutocompleteProps<T>(props: DefaultUseAutocompleteProps<T>) {
	return props
}

export default function useChannelSelection(id?: string) {
	const channels = useGetChannels()

	const control = useController<ReminderUpdateFormData>({ name: "channel_id" })

	return createAutocompleteProps({
		options: channels.map((channel) => channel.id),
		getOptionLabel: (opt) => channels.find((channel) => channel.id === opt)?.name ?? "",
		groupBy: (opt) => channels.find((channel) => channel.id === opt)?.guildName ?? "",
		defaultValue: id,
		onChange: (_, value) => {
			control.field.onChange(value)
		},
		value: id,
	})
}
