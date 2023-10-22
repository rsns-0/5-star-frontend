import { defaultLinks } from "../../resources/links"
import { Group } from "@mantine/core"

import classes from "./Header.module.css"
import InviteDiscordButton from "../InviteDiscordButton/InviteDiscordButton"
import Link from "next/link"
import { observer } from "mobx-react"

import NavbarControls from "../Navbar/NavbarControls"

type HeaderProps = {
	links?: { label: string; link: string }[]
}

export { defaultLinks }

export const Header = observer(({ links = defaultLinks }: HeaderProps) => {
	const items = links.map((link) => (
		<Link key={link.label} href={link.link} className={classes.link}>
			{link.label}
		</Link>
	))

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
