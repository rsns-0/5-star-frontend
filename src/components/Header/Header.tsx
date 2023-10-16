import { Group, Burger } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { AiFillStar } from "react-icons/ai"
import classes from "./HeaderSearch.module.css"
import InviteDiscordButton from "../InviteDiscordButton/InviteDiscordButton"

type HeaderProps = {
	links?: { label: string; link: string }[]
}

export const defaultLinks = [
	{ label: "Home", link: "/home" },
	{ label: "Github", link: "/github" },
	{ label: "Developers", link: "/developers" },
]

export function Header({ links = defaultLinks }: HeaderProps) {
	const [opened, { toggle }] = useDisclosure(false)

	const items = links.map((link) => (
		<a
			key={link.label}
			href={link.link}
			className={classes.link}
			onClick={(event) => event.preventDefault()}
		>
			{link.label}
		</a>
	))

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group>
					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
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
