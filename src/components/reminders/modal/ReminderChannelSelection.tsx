import { AutocompleteElement } from "react-hook-form-mui"
import { type ReminderUpdateFormData } from "../../../models/reminder-frontend"
import { useReminderForm } from "~/providers/reminderFormProvider/useReminderForm"

export default function ReminderChannelSelection({ label = "Channels" }) {
	const { channels } = useReminderForm()

	return (
		<>
			<AutocompleteElement<ReminderUpdateFormData>
				name="channel_id"
				options={channels}
				matchId
				label={label}
				autocompleteProps={{
					groupBy: (opt: (typeof channels)[0]) =>
						channels.find((channel) => channel.id === opt.id)?.guildName ?? "",
				}}
			/>
		</>
	)
}
