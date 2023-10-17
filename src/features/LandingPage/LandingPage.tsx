import MainContent from "../../components/MainContent/MainContent"
import { Button, Group, Stack } from "@mantine/core"
import { Header, defaultLinks } from "../../components/Header/Header"
import InviteDiscordButton from "../../components/InviteDiscordButton/InviteDiscordButton"
import FeatureGrid from "../../components/FeatureGrid/FeatureGrid"
import { TitleText } from "../../components/typography/TitleText"
import { FeatureItem } from "../../components/FeatureGrid/FeatureItem"
import { IconCalendarCheck, IconWorld } from "@tabler/icons-react"

const LandingPageLayout = () => {
	return (
		<>
			<Header links={[...defaultLinks]} />
			<Stack align="center" gap="xl">
				<MainContent
					titleText="5-star service at your fingertips."
					bodyText="5-stars automates your daily tasks and comes with additional features."
				>
					<Group justify="end">
						<InviteDiscordButton />
					</Group>
				</MainContent>

				<FeatureGrid titleComponent={<TitleText text="Features" />}>
					<FeatureItem
						title="React to Translate"
						description="React to any message with a flag matching your preferred language and the bot will automatically detect the message's original language and translate it to your preferred language."
						icon={IconWorld}
					>
						<Group justify="end">
							<Button>Show</Button>
						</Group>
					</FeatureItem>
					<FeatureItem
						title="Reminders"
						description="Set reminders through the discord interface or through our feature-packed table in the web browser."
						icon={IconCalendarCheck}
					>
						<Group justify="end" align="end">
							<Button>Show</Button>
						</Group>
					</FeatureItem>
				</FeatureGrid>
			</Stack>
		</>
	)
}

export default LandingPageLayout