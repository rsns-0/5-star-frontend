import { Group } from "@mantine/core"
import { AiFillStar } from "react-icons/ai"
import classes from "./HeaderSearch.module.css"
import InviteDiscordButton from "../InviteDiscordButton/InviteDiscordButton"
import Link from "next/link"

type HeaderProps = {
	links?: { label: string; link: string }[]
}

export const defaultLinks = [
	{ label: "Home", link: "/" },
	{ label: "Github", link: "https://github.com/rsns-0/5-star-backend" },
	{ label: "Developers", link: "/developers" },
	{ label: "About", link: "/about" },
]

export function Header({ links = defaultLinks }: HeaderProps) {
	const items = links.map((link) => (
		<Link key={link.label} href={link.link} className={classes.link}>
			{link.label}
		</Link>
	))

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group>
					<AiFillStar size={25} />
					<h2>5 Star Bot</h2>
				</Group>
				<Group>
					<Group ml={50} gap={7} className={classes.links} visibleFrom="sm">
						{items}
						<InviteDiscordButton />
					</Group>
				</Group>
			</div>
		</header>
	)
}
