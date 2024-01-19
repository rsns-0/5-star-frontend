import { defaultLinks } from "../../resources/links"
import { Group } from "@mantine/core"

import classes from "./Header.module.css"
import InviteDiscordButton from "../InviteDiscordButton/InviteDiscordButton"
import { observer } from "mobx-react"

import NavbarControls from "../Navbar/NavbarControls"
import { createLinkItems } from "../../LinkItem/LinkItem"

type HeaderProps = {
	links?: typeof defaultLinks
}

export const Header = observer(({ links = defaultLinks }: HeaderProps) => {
	const items = createLinkItems(links, classes.link)

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<NavbarControls />
				<Group>
					<Group ml={50} gap={7} className={classes.links} visibleFrom="sm">
						{items}
						<InviteDiscordButton />
					</Group>
				</Group>
			</div>
		</header>
	)
})
