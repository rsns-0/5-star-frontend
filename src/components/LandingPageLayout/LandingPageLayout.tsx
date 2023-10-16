import React from "react"
import MainSection from "../mainSection/MainSection"
import { Group, Stack } from "@mantine/core"
import { Header, defaultLinks } from "../Header/Header"
import InviteDiscordButton from "../InviteDiscordButton/InviteDiscordButton"

const LandingPageLayout = () => {
	return (
		<>
			<Header links={[...defaultLinks]}></Header>
			<Stack align="center">
				<MainSection>
					<Group justify="end">
						<InviteDiscordButton />
					</Group>
				</MainSection>
			</Stack>
		</>
	)
}

export default LandingPageLayout
