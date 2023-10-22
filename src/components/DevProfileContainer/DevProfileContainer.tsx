import { Avatar } from "@mantine/core"
import classes from "./DevProfileContainer.module.css"
import { api } from "~/utils/api"

type DevProfileContainerProps = {
	dev: string
}

export default function DevProfileContainer({ dev }: DevProfileContainerProps) {
	const user = getDev(dev)
	return (
		<>
			<div className={classes.devBox}>
				<Avatar
					alt="developer discord avatar"
					src={user ? user.image : "null"}
					size={100}
				/>
				<div className={classes.devInfo}>
					<div className={classes.devName}>{user ? `@${user.name}` : "......."}</div>
					{user ? `${user.role}` : "......."}
				</div>
			</div>
		</>
	)
}

const getDev = (dev: string) => {
	const content = api.developerInfo.getDeveloperInfo.useQuery({ content: dev })
	if (content.data && content.data.length > 0) {
		return content.data[0]
	} else {
		return {
			id: "null",
			name: "null",
			email: "null",
			emailVerified: "null",
			image: "null",
			role: "null",
		}
	}
}
