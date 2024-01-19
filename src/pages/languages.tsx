import { Stack } from "@mantine/core"
import { LanguagesTable } from "../components/Language/LanguagesTable"
import { type InferGetStaticPropsType } from "next"
import { serverRouter } from "../utils/serverApi"
import { LanguagePageHeading } from "../features/languages/LanguagePageHeading"

export default function Languages({ langData }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Stack pl="sm" gap="xl" pt="xl" pb="xl" pr="sm">
				<LanguagePageHeading />
				<LanguagesTable data={langData} />
			</Stack>
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
