import MainContent from "../../components/MainContent/MainContent"
import { Box, Divider, Group, Stack } from "@mantine/core"

import InviteDiscordButton from "../../components/InviteDiscordButton/InviteDiscordButton"
import FeatureGrid from "../../components/FeatureGrid/FeatureGrid"
import { TitleText } from "../../components/typography/TitleText"
import { FeatureItem } from "../../components/FeatureGrid/FeatureItem"
import { IconCalendarCheck, IconWorld } from "@tabler/icons-react"
import { ButtonWithModal } from "../../components/containers/ButtonWithModal"
import { ReactToTranslate } from "./featureContent/ReactToTranslate"
import { ReminderFeatureContent } from "./featureContent/Reminders"

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

const LandingPageLayout = () => {
	return (
		<>
			<Stack align="center" gap="xl">
				<MainContent
					titleText="Language and Time Services"
					bodyText="5 Stars provides data and services related to languages, countries, and time."
				>
					<Group justify="end">
						<InviteDiscordButton />
					</Group>
				</MainContent>

				<FeatureGrid titleComponent={<TitleComponent />}>
					<FeatureItem
						title="React to Translate"
						description="React to any message with a flag matching your preferred language and the bot will automatically detect the message's original language and translate it to your preferred language."
						icon={IconWorld}
					>
						<ButtonWithModal title="React To Translate" buttonText="Learn More">
							<ReactToTranslate />
						</ButtonWithModal>
					</FeatureItem>
					<FeatureItem
						title="Reminders"
						description="Set reminders through the discord interface or through our feature-packed table in the web browser."
						icon={IconCalendarCheck}
					>
						<Box mt="lg">
							<ButtonWithModal title="Reminders" buttonText="Learn More">
								<ReminderFeatureContent />
							</ButtonWithModal>
						</Box>
					</FeatureItem>
				</FeatureGrid>
			</Stack>
		</>
	)
}

export default LandingPageLayout
