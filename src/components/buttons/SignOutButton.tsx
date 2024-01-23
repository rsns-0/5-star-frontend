import { Button, type ButtonProps } from "@mantine/core"
import { signOut } from "next-auth/react"

type SignOutButtonProps = ButtonProps

export function SignOutButton(props: SignOutButtonProps) {
	return (
		<Button {...props} onClick={() => signOut()}>
			{props.children ?? "Sign Out"}
		</Button>
	)
}
