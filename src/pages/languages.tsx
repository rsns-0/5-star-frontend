import { Stack } from "@mantine/core"
import { LanguagesTable } from "../components/Language/LanguagesTable"
import { type InferGetStaticPropsType } from "next"
import { serverRouter } from "../utils/serverApi"
import { LanguagePageHeading } from "../features/languages/LanguagePageHeading"
import { TwemojiProvider } from "../components/Tweemoji/TweemojiImage"

export default function Languages({ langData }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<TwemojiProvider>
				<Stack pl="sm" gap="xl" pt="xl" pb="xl" pr="sm">
					<LanguagePageHeading />
					<LanguagesTable data={langData} />
				</Stack>
			</TwemojiProvider>
		</>
	)
}

export async function getStaticProps() {
	const langData = await serverRouter.languages.getSupportedLanguages()
	return {
		props: {
			langData,
		},
	}
}
