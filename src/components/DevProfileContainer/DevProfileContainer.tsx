import { Avatar, Text } from "@mantine/core"
import classes from "./DevProfileContainer.module.css"

type DevProfileContainerProps = {
	src?: string | null
	name: string
	role: string
}

export default function DevProfileContainer({ src, name, role }: DevProfileContainerProps) {
	return (
		<div className={classes.devBox}>
			<Avatar alt="Discord Developer Avatar" src={src} size={100} />

			<div className={classes.devInfo}>
				<Text className={classes.devName}>{`@${name}`}</Text>
				<Text>{role}</Text>
			</div>
		</div>
	)
}
