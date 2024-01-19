import { FaDiscord } from "react-icons/fa"
import classes from "./InviteDiscordButton.module.css"

type InviteDiscordButtonProps = {
	text?: string
	icon?: any
	onClick?: () => void
}

export default function InviteDiscordButton({
	text = "Invite to Discord",
	icon = <FaDiscord size={25} />,
	onClick,
}: InviteDiscordButtonProps) {
	return (
		<button className={classes.button} onClick={onClick}>
			<div className={classes.content}>
				<div className={classes.icon}>{icon}</div>
				<span>{text}</span>
			</div>
		</button>
	)
}
