import { Box, Group, Button, Modal, Textarea, Stack, NativeSelect } from "@mantine/core"

import { TitleText } from "../../components/typography/TitleText"
import { useReminderFormModal } from "../../hooks/reminderTable"
import { DateTimePicker } from "@mantine/dates"
import { observer } from "mobx-react"
import { useChannels } from "../../hooks/getChannels"

type ReminderTableModalProps = {
	data?: { id?: number }
	modalProps?: Exclude<
		React.ComponentProps<typeof Modal>,
		"opened" | "onClose" | "title" | "size" | "centered" | "children"
	>
}

export const ReminderTableModal = observer(({ modalProps }: ReminderTableModalProps) => {
	const { isOpen, close, title, register, onSubmit, values, setFieldValue } =
		useReminderFormModal()
	const { guilds, getChannels } = useChannels()

	const channelsData = getChannels(values.guild_id)

	const { onChange, ...rest } = register("guild_id")

	const onChangeGuild = (value: string) => {
		onChange(value)
		setFieldValue("channel_id", channelsData[0]?.value ?? "")
	}

	return (
		<>
			<Modal
				closeButtonProps={{ "aria-label": "Close modal" }}
				title={<TitleText fz={"xl"}>{title}</TitleText>}
				size={"md"}
				opened={isOpen}
				onClose={close}
				centered
				{...modalProps}
			>
				<Box component="form" maw={400} mx="auto" onSubmit={onSubmit}>
					<Stack>
						<Textarea
							data-testid="reminder_message"
							label="Message"
							placeholder='Write your message here. Defaults to "Ping!" if left blank.'
							{...register("reminder_message")}
						/>
						<DateTimePicker
							data-testid="time"
							label="Time"
							valueFormat="L LT"
							placeholder="Select a time."
							{...register("time")}
						/>
						<NativeSelect
							data-testid="guild_id"
							data={guilds}
							label="Guild"
							placeholder="Select a guild."
							onChange={(s) => onChangeGuild(s.target.value)}
							{...rest}
						/>
						<NativeSelect
							data-testid="channel_id"
							data={channelsData}
							label="Channel"
							placeholder="Select a channel."
							{...register("channel_id")}
						/>
						<Group justify="flex-end" mt="md">
							<Button data-testid="submit" type="submit">
								Submit
							</Button>
						</Group>
					</Stack>
				</Box>
			</Modal>
		</>
	)
})
