import { Burger, Group, type GroupProps } from "@mantine/core"

import { navbarModel } from "../../models/NavbarModel"
import { StarIcon } from "../icons/StarIcon"

type NavbarControlsProps = {
	title?: string
	groupProps?: GroupProps
}

const NavbarControls = ({ title = "5 Stars", groupProps }: NavbarControlsProps) => {
	return (
		<Group {...groupProps}>
			<Burger onClick={() => navbarModel.toggle()} title="Toggle navigation menu" />
			<StarIcon />
			<h2>{title}</h2>
		</Group>
	)
}

export default NavbarControls
