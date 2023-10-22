import { Burger, Group, type GroupProps } from "@mantine/core"

import { navbarModel } from "../../models/NavbarModel"
import { StarIcon } from "../icons/StarIcon"

type NavbarControlsProps = {
	title?: string
	groupProps?: GroupProps
}

const NavbarControls = ({ title = "5 Star Bot", groupProps }: NavbarControlsProps) => {
	return (
		<Group {...groupProps}>
			<Burger /** Changed button impl to burger for accessibility; it is not immediately obvious that the star icon would be a button. */
				onClick={() => {
					navbarModel.toggle()
				}}
			/>
			<StarIcon />
			<h2>{title}</h2>
		</Group>
	)
}

export default NavbarControls
