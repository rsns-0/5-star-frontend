import { Stack, Box, Text, Center, Container } from "@mantine/core"
import { TitleText } from "../../components/typography/TitleText"
import { BorderCard } from "../../components/card/BorderCard"

export function LanguagePageHeading() {
	return (
		<Center>
			<BorderCard>
				<Stack>
					<Container>
						<TitleText order={1}>Supported Languages</TitleText>
					</Container>
					<Box component="section" title="Description" maw="40rem">
						<Text>
							The following table provides data on the mappings between the country,
							its associated flag emoji, and its estimated primary language. Only
							countries and languages with mainstream ISO codes and countries with
							known spoken languages will be displayed. Hover over the column headers
							for more information.
						</Text>
					</Box>
				</Stack>
			</BorderCard>
		</Center>
	)
}
