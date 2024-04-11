import { defaultLinks } from "../../resources/links"
import { Group } from "@mantine/core"

import classes from "./Header.module.css"

import { observer } from "mobx-react"

import NavbarControls from "../Navbar/NavbarControls"
import { createLinkItems } from "../../LinkItem/LinkItem"
import { useSession } from "next-auth/react"
import { SignInButton } from "../buttons/SignInButton"
import { SignOutButton } from "../buttons/SignOutButton"

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
					<Group ml={50} gap={7} className={classes.links} visibleFrom="md">
						{items}
					</Group>
					<SignInOrOutButton />
				</Group>
			</div>
		</header>
	)
})

const SignInOrOutButton = () => {
	const session = useSession()
	if (session.status === "authenticated") {
		return <SignOutButton w="7rem" />
	}
	return <SignInButton w="7rem" />
}