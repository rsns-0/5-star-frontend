import Link from "next/link"
import { useRouter } from "next/router"
import { type defaultLinks } from "../resources/links"

type LinkProps = {
	link: (typeof defaultLinks)[number]
	className?: string | undefined
}

export const Linkitem: React.FC<LinkProps> = ({ link, className }) => {
	const { route } = useRouter()

	const active = route === link.link

	return (
		<Link className={className} href={link.link} data-active={active ? "active" : undefined}>
			{link.label}
		</Link>
	)
}

export const createLinkItems = (links: typeof defaultLinks, className: string | undefined) => {
	return links.map((link) => {
		return <Linkitem link={link} className={className} key={link.link} />
	})
}
