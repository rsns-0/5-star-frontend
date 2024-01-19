import DevelopersPage from "~/features/DevelopersPage.tsx/DevelopersPage"

import { serverRouter } from "../utils/serverApi"
import { type InferGetStaticPropsType } from "next"

export default function Developers({ developers }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<DevelopersPage developers={developers} />
		</>
	)
}

export async function getStaticProps() {
	const developers = await serverRouter.developerInfo.getAllDeveloperProfiles()

	return {
		props: {
			developers,
		},
	}
}
