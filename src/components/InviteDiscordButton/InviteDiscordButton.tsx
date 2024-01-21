import { FaDiscord } from "react-icons/fa"
import classes from "./InviteDiscordButton.module.css"
import { type ButtonProps } from "@mantine/core"
import { type ReactNode } from "react"
import { useRouter } from "next/router"
import { DISCORD_INVITE_LINK } from "../../resources/links"

export interface InviteDiscordButtonProps extends ButtonProps {
	text?: string
	icon?: ReactNode
}

export default function InviteDiscordButton({
	text = "Invite to Discord",
	icon = <FaDiscord size={25} />,
}: InviteDiscordButtonProps) {
	const router = useRouter()
	const onClick = async () => await router.push(DISCORD_INVITE_LINK)

	return (
		<button className={classes.button} onClick={onClick}>
			<div className={classes.content}>
				<div className={classes.icon}>{icon}</div>
				<span>{text}</span>
			</div>
		</button>
	)
}
