import { Transition } from "@mantine/core"

import classes from "./Navbar.module.css"
import Link from "next/link"
import { type defaultLinks } from "../Header/Header"
import { observer } from "mobx-react"
import { navbarModel } from "../../models/NavbarModel"
import { useClickOutside } from "@mantine/hooks"
import NavbarControls from "./NavbarControls"

type NavbarProps = {
	links: typeof defaultLinks
}

export const Navbar = observer(({ links }: NavbarProps) => {
	const ref = useClickOutside(() => {
		navbarModel.close()
	})
	const linkElements = createNavbarLinkitems(links)

	return (
		<Transition mounted={navbarModel.isOpen} transition="slide-right" duration={400}>
			{(styles) => {
				return (
					<nav className={classes.navbar} style={styles} ref={ref}>
						<div className={classes.wrapper}>
							<div className={classes.main}>
								<NavbarControls groupProps={{ className: classes.title }} />
								{linkElements}
							</div>
						</div>
					</nav>
				)
			}}
		</Transition>
	)
})

const NavbarLinkItem = ({ link, label }: { link: string; label: string }) => {
	return (
		<Link className={classes.link} href={link}>
			{label}
		</Link>
	)
}

function createNavbarLinkitems(links: typeof defaultLinks) {
	return links.map((link) => <NavbarLinkItem key={link.label} {...link} />)
}
