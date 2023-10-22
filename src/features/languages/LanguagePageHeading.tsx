import { Stack, Box, Text, Container } from "@mantine/core"
import { TitleText } from "../../components/typography/TitleText"

export function LanguagePageHeading() {
	return (
		<Stack>
			<Container>
				<TitleText order={1}>Supported Languages</TitleText>
			</Container>
			<Box component="section" w={"40rem"}>
				<Text>
					The following table shows the mappings between the associated discord flag
					emoji, the associated country, and the estimated primary language spoken in that
					country. It also shows whether or not the language is available as an available
					option to use the react feature with.
				</Text>
			</Box>
		</Stack>
	)
}
