import { Button, type ButtonProps } from "@mantine/core"
import Link from "next/link"

type SignInButtonProps = ButtonProps

export function SignInButton(props: SignInButtonProps) {
	return (
		<Button component={Link} href="/api/auth/signin" {...props}>
			Sign in
		</Button>
	)
}
