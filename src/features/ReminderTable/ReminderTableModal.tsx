import { Box, Group, Button, Modal, Select, Textarea, Stack } from "@mantine/core"

import { TitleText } from "../../components/typography/TitleText"
import { useReminderFormModal } from "../../hooks/reminderTable"
import { useGetChannels } from "~/hooks/getChannels"
import { DateTimePicker } from "@mantine/dates"
import { observer } from "mobx-react"


type ReminderTableModalProps = {
	data?: { id?: number }
	modalProps?: Exclude<
		React.ComponentProps<typeof Modal>,
		"opened" | "onClose" | "title" | "size" | "centered" | "children"
	>
}

export const ReminderTableModal = observer(({ modalProps }: ReminderTableModalProps) => {
	const { isOpen, close, title, register, onSubmit } = useReminderFormModal()
	const channels = useGetChannels()

	return (
		<>
			<Modal
				closeButtonProps={{ "aria-label": "Close modal" }}
				title={<TitleText>{title}</TitleText>}
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
							placeholder='Write your message here. Defaults to "PING!" if left blank.'
							{...register("reminder_message")}
						/>
						<DateTimePicker
							data-testid="time"
							label="Time"
							valueFormat="L LT"
							placeholder="Select a time."
							{...register("time")}
						/>
						<Select
							data-testid="channel_id"
							data={channels}
							label="Channel"
							placeholder="Select a channel."
							searchable
							allowDeselect={false}
							checkIconPosition="right"
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
