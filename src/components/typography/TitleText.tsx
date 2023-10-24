import { Title, type TitleProps } from "@mantine/core"
import classes from "./TitleText.module.css"
import { type ReactNode } from "react"
interface TitleTextProps extends TitleProps {
	children: ReactNode
}

export const TitleText = ({ children, className = classes.title, ...rest }: TitleTextProps) => {
	return (
		<Title className={className} order={2} {...rest}>
			{children}
		</Title>
	)
}
