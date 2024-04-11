import { FaDiscord } from "react-icons/fa"
import classes from "./InviteDiscordButton.module.css"
import { type ButtonProps } from "@mantine/core"
import { type ReactNode } from "react"

import { DISCORD_INVITE_LINK } from "../../resources/links"
import Link from "next/link"

export interface InviteDiscordButtonProps extends ButtonProps {
	text?: string
	icon?: ReactNode
}

export default function InviteDiscordButton({
	text = "Invite to Discord",
	icon = <FaDiscord size={25} />,
}: InviteDiscordButtonProps) {
	return (
		<Link href={DISCORD_INVITE_LINK} className={classes.text}>
			<button className={classes.button} type="button">
				<div className={classes.content}>
					<div className={classes.icon}>{icon}</div>
					<span>{text}</span>
				</div>
			</button>
		</Link>
	)
}