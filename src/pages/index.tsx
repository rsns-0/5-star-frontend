import MainContent from "../components/MainContent/MainContent"
import { Image, Box, Divider, Group, Stack, Text } from "@mantine/core"
import Link from "next/link"
import InviteDiscordButton from "../components/InviteDiscordButton/InviteDiscordButton"
import FeatureGrid from "../components/FeatureGrid/FeatureGrid"
import { TitleText } from "../components/typography/TitleText"
import { FeatureItem } from "../components/FeatureGrid/FeatureItem"
import { IconCalendarCheck, IconWorld } from "@tabler/icons-react"
import { ButtonWithModal } from "../components/containers/ButtonWithModal"
import { TranslatorDocumentation } from "~/components/generated/TranslatorDocumentation"
import { ReminderDocumentation } from "~/components/generated/ReminderDocumentation"

export default function Home() {
	return (
		<>
			<Stack align="center" gap="xl">
				<MainContent
					titleText="Welcome!"
					bodyText="5 Stars provides data and services related to languages, countries, and time."
				>
					<Group justify="end">
						<InviteDiscordButton />
					</Group>
				</MainContent>

				<FeatureGrid titleComponent={<TitleComponent />}>
					<FeatureItem
						title="Translator"
						description="React to any message with a country flag and the message will be translated to the language of that country."
						icon={IconWorld}
					>
						<ButtonWithModal title="Translator" buttonText="Learn More">
							<Stack gap="1rem">
								<Box component="section">
									<Text>
										<TranslatorDocumentation />
										Details on what languages are mapped to each country can be
										found at <Link href="/languages">this link</Link>.
									</Text>
								</Box>

								<Box component="section" />

								<Image
									alt="Image of translation feature"
									src="/translate-demo.png"
									maw="28rem"
								/>
							</Stack>
						</ButtonWithModal>
					</FeatureItem>
					<FeatureItem
						title="Reminders"
						description="Set reminders through the discord interface or through our feature-packed table in the web browser."
						icon={IconCalendarCheck}
					>
						<Box mt="lg">
							<ButtonWithModal
								title="Reminders"
								buttonText="Learn More"
								modalProps={{ size: "80vw" }}
							>
								<Stack mr="xs">
									<Text>
										<ReminderDocumentation />
									</Text>
								</Stack>
							</ButtonWithModal>
						</Box>
					</FeatureItem>
				</FeatureGrid>
			</Stack>
		</>
	)
}

const TitleComponent = () => {
	return (
		<>
			<TitleText variant="gradient" style={{ fontSize: "3rem" }}>
				Features
			</TitleText>

			<Divider size="md" color="blue.8" />
		</>
	)
}
