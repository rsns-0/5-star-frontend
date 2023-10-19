import { Box, Image, Text } from "@mantine/core"
import { TitleText } from "../../../components/typography/TitleText"
import Link from "next/link"
import { DeepLLink } from "../../../resources/links"

export const ReactToTranslate = () => {
	return (
		<>
			<Box component="section">
				<TitleText order={3}>How does it work?</TitleText>
				<Text>
					Choose the option &ldquo;Add Reaction&rdquo; next to a message and click on a
					country flag that matches your language. For example, English speakers may react
					with the flag representing the United States or the flag representing Britain to
					translate the message into English. The original language will be inferred and
					translated by the <Link href={DeepLLink}>DeepL API</Link>. Note that not all
					languages and flags are supported. Please check{" "}
					<Link href="/languages">here</Link> for a reference of the supported languages
					and flags.
				</Text>
			</Box>

			<Box component="section">
				<Image alt="Image of translation feature" src="/translate-demo.png"></Image>
			</Box>
		</>
	)
}
