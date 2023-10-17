import { Title, type TitleProps } from "@mantine/core"
import classes from "./TitleText.module.css"
interface TitleTextProps extends TitleProps {
	text: string
}

export const TitleText = ({ text, ...rest }: TitleTextProps) => {
	return (
		<Title className={classes.title} order={2} {...rest}>
			{text}
		</Title>
	)
}
