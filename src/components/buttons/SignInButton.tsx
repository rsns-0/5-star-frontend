import { Button, type ButtonProps } from "@mantine/core"
import { signIn } from "next-auth/react"


type SignInButtonProps = ButtonProps

export function SignInButton(props: SignInButtonProps) {
	return (
		<Button {...props} onClick={() => signIn()}>
			Sign In
		</Button>
	)
}
