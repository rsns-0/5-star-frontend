import { Title } from "@mantine/core"
import DevProfileContainer from "~/components/DevProfileContainer/DevProfileContainer"
import { Header, defaultLinks } from "~/components/Header/Header"
import classes from "./DevelopersPage.module.css"

const DevelopersPageLayout = () => {
	return (
		<>
			<Header links={[...defaultLinks]} />
			<div className={classes.devBox}>
				<Title size={55} className={classes.titleBox}>
					Developers
				</Title>
			</div>
			<div className={classes.devBox}>
				<DevProfileContainer dev="matuz" />
				<DevProfileContainer dev="rsn5" />
			</div>
		</>
	)
}

export default DevelopersPageLayout
