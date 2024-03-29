import { type ComponentPropsWithoutRef } from "react"
import { AiFillStar } from "react-icons/ai"
import styles from "./StarIcon.module.css"
import { clsx } from "clsx"
type StarIconPropsBase = ComponentPropsWithoutRef<typeof AiFillStar>

type StarIconProps =
	| (StarIconPropsBase & { onClick?: never; title?: undefined; highlightOnHover?: never })
	| (StarIconPropsBase & {
			onClick: <T>(args: T) => any
			title: string
			highlightOnHover?: boolean
	  })

/** Must provide Title if given onClick. */
export const StarIcon = ({ role, onClick, highlightOnHover, ...props }: StarIconProps) => {
	if (onClick && !role) {
		role = "button"
	}

	return (
		<AiFillStar
			onClick={onClick}
			role={role}
			className={clsx({
				"cursor-pointer": role === "button",
				[styles.icon!]: highlightOnHover,
			})}
			size={25}
			{...props}
		/>
	)
}
