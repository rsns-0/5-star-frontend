import { useSession } from "next-auth/react"

import NotSignedInCard from "../components/card/NotSignedInCard"
import InfoCard from "../components/card/InfoCard"

import { Center } from "@mantine/core"

export default function SignIn() {
	const { data: sessionData } = useSession()

	const DisplayedData = () => {
		if (sessionData) {
			return (
				<InfoCard
					header="Successfully signed in."
					paperProps={{ style: { transform: "scale(1.5)" } }}
				></InfoCard>
			)
		} else {
			return <NotSignedInCard scale={1.5} />
		}
	}

	return (
		<Center h="80vh">
			<DisplayedData />
		</Center>
	)
}
