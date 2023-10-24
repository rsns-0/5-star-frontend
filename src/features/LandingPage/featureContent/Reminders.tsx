import { Image, Code, List, Text, Stack } from "@mantine/core"
import Link from "next/link"
import { type ReactNode } from "react"

export const ReminderFeatureContent = () => {
	return (
		<Stack mr="xs">
			<Stack c="section">
				<Text>
					If it is the first time using this feature, the bot will prompt you to set a
					timezone which it will remember for future sessions when you first try to set a
					reminder with <Code>/reminder set</Code>. Afterwards, the following commands
					will be available:
				</Text>

				<List>
					<CommandItem command="/reminder timezone">
						Change your timezone. Follow the prompts to change your timezone.
					</CommandItem>
					<CommandItem command="/reminder set">
						Set a reminder. Follow the prompts to set the reminder.
					</CommandItem>
					<CommandItem command="/reminder help">
						Show more information about available commands and usage.
					</CommandItem>
					<CommandItem command="/reminder edit">
						Shows a paginated list of all of your reminders. Follow the prompts to edit
						or delete a reminder.
					</CommandItem>
					<CommandItem command="/reminder table">
						Generates a URL which directs you to a more fully featured view to manage
						your reminders (expires after 1 hour; don&apos;t share this with anyone,
						unless you trust them). You can also login directly and go to your{" "}
						<Link href="reminder-table">Reminder Table</Link> using your Discord
						account. No link generation needed.
					</CommandItem>
				</List>
			</Stack>

			<Image alt="Image of reminder feature" src="/reminder-demo.png" maw="28rem" />
		</Stack>
	)
}

const CommandItem = ({ command, children }: { command: string; children: ReactNode }) => {
	return (
		<List.Item>
			<Text>
				<Code>{command}</Code> - {children}
			</Text>
		</List.Item>
	)
}
