import { Button } from "@mantine/core"

import { defaultLinks } from "../../resources/links"
import { observer } from "mobx-react"
import { Navbar } from "../../components/Navbar/Navbar"
import { navbarModel } from "../../models/NavbarModel"

function Test() {
	return (
		<>
			<Navbar links={defaultLinks}></Navbar>
			<Button
				onClick={() => {
					navbarModel.open()
				}}
			>
				Toggle
			</Button>
		</>
	)
}

export default observer(Test)
