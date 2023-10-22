import { Title } from "@mantine/core"
import { Header, defaultLinks } from "~/components/Header/Header"
import classes from "./DevelopersPage.module.css"
import { type GetAllDevelopersOutput } from "../../types/types"
import DevProfileContainer from "../../components/DevProfileContainer/DevProfileContainer"

type DevelopersPageProps = {
	developers: GetAllDevelopersOutput
}

const DevelopersPage = ({ developers }: DevelopersPageProps) => {
	return (
		<>
			<Header links={[...defaultLinks]} />
			<div className={classes.devBox}>
				<Title size={55} className={classes.titleBox}>
					Developers
				</Title>
			</div>

			<div className={classes.devBox}>
				{developers.map(({ id, ...rest }) => {
					return <DevProfileContainer key={id} {...rest} />
				})}
			</div>
		</>
	)
}

export default DevelopersPage
