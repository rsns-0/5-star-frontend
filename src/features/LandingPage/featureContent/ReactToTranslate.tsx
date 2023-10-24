import { Box, Image, Stack, Text } from "@mantine/core"
import Link from "next/link"

export const ReactToTranslate = () => {
	return (
		<>
			<Stack gap="1rem">
				<Box component="section">
					<Text>
						Choose the option &ldquo;Add Reaction&rdquo; next to a message and click on
						a country flag that matches your language. Additional details and a mapping
						of flag emojis to their associated language can be found at{" "}
						<Link href="/languages">this link</Link>.
					</Text>
				</Box>

				<Box component="section"></Box>

				<Image alt="Image of translation feature" src="/translate-demo.png" maw="28rem" />
			</Stack>
		</>
	)
}
