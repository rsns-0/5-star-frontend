import { Title, type TitleProps } from "@mantine/core"
import classes from "./TitleText.module.css"
type TitleTextProps = {
	text: string
} & TitleProps

export const TitleText = ({ text }: TitleTextProps) => {
	return (
		<Title className={classes.title} order={2}>
			{text}
		</Title>
	)
}
