import { IconWorld, IconCalendarCheck } from "@tabler/icons-react"
import FeatureGrid from "../../components/FeatureGrid/FeatureGrid"
import { FeatureItem } from "../../components/FeatureGrid/FeatureItem"

import { TitleText } from "../../components/typography/TitleText"

export default function Test() {
	return (
		<FeatureGrid titleComponent={<TitleText text="Features" />}>
			<FeatureItem
				title="React to Translate"
				description="React to any message with a flag matching your preferred language and the bot will automatically detect the message's original language and translate it to your preferred language."
				icon={IconWorld}
			/>
			<FeatureItem
				title="Reminders"
				description="Set reminders through the discord interface or through our feature-packed table in the web browser."
				icon={IconCalendarCheck}
			/>
		</FeatureGrid>
	)
}
