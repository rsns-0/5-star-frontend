import { Header, defaultLinks } from "~/components/Header/Header"

export default function Home() {
	return (
		<>
			<Header links={[...defaultLinks, { label: "About", link: "/about" }]}></Header>
		</>
	)
}
