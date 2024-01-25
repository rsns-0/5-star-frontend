import { Title, type TitleProps } from "@mantine/core"
import classes from "./TitleText.module.css"

export const TitleText = ({
	children,
	order = 2,
	className = classes.title,
	...rest
}: TitleProps) => {
	return (
		<Title className={className} order={order} {...rest}>
			{children}
		</Title>
	)
}
