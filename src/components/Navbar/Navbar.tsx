import { Stack, Transition } from "@mantine/core"

import classes from "./Navbar.module.css"

import { observer } from "mobx-react"
import { navbarModel } from "../../models/NavbarModel"
import { useClickOutside } from "@mantine/hooks"
import NavbarControls from "./NavbarControls"

import { createLinkItems } from "../../LinkItem/LinkItem"
import type { defaultLinks } from "../../resources/links"

type NavbarProps = {
	links: typeof defaultLinks
}

export const Navbar = observer(({ links }: NavbarProps) => {
	const ref = useClickOutside(() => {
		navbarModel.close()
	})

	const linkElements = createLinkItems(links, classes.link)

	return (
		<Transition
			mounted={navbarModel.isOpen}
			transition="slide-right"
			duration={250}
			exitDuration={250}
		>
			{(styles) => {
				return (
					<Stack>
						<nav className={classes.navbar} style={styles} ref={ref}>
							<div className={classes.wrapper}>
								<div className={classes.main}>
									<NavbarControls groupProps={{ className: classes.title }} />
									{linkElements}
								</div>
							</div>
						</nav>
					</Stack>
				)
			}}
		</Transition>
	)
})
