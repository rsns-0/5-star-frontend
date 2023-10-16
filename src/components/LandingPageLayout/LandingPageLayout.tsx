import React from "react"
import MainSection from "../mainSection/MainSection"
import { Button, Group, Stack } from "@mantine/core"
import { Header } from "../Header/Header"
import InviteDiscordButton from "../InviteDiscordButton/InviteDiscordButton"

const LandingPageLayout = () => {
	return (
		<>
			<Header />
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
