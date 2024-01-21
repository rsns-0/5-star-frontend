import { Button, type ButtonProps } from "@mantine/core"
import { signIn } from "next-auth/react"
import Link from "next/link"

type SignInButtonProps = ButtonProps

export function SignInButton(props: SignInButtonProps) {
	return (
		<>
			<Button {...props} onClick={() => signIn()}>
				sign in
			</Button>
		</>
		// <Button component={Link} href="/api/auth/signin" {...props}>
		// 	Sign in
		// </Button>
	)
}
