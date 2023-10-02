import { useReminderDatabaseService } from "./useReminderDatabaseService"

import { api } from "../utils/api"

import { type UseAutocompleteProps } from "@mui/base/useAutocomplete"

type DefaultUseAutocompleteProps<T extends object> = UseAutocompleteProps<
	T,
	undefined,
	undefined,
	undefined
>

export const useReminderModel = () => {
	const { data: reminderData, ...rest } = useReminderDatabaseService()

	const { data: guildAndChannelData } =
		api.discordRouter.getGuildsAndTextBasedChannelsOfUser.useQuery(undefined, {
			refetchOnWindowFocus: false,
			initialData: [],
		})

	const dropdownProps = createAutocompleteProps({
		options: guildAndChannelData,
		getOptionLabel: (opt) => opt.name,
		groupBy: (opt) => opt.guildName,
	})

	const getDropdownPropsWithInitialValue = (channelId: string) => {
		const channel = guildAndChannelData.find((channel) => channel.id === channelId)

		return createAutocompleteProps({
			...dropdownProps,
			defaultValue: channel,
		})
	}

	return {
		...rest,
		getDropdownPropsWithInitialValue,
		reminderData,
	}
}

function createAutocompleteProps<T extends object>(props: DefaultUseAutocompleteProps<T>) {
	return props
}
