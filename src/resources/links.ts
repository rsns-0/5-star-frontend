export const DeepLLink = `https://www.deepl.com/en/docs-api`

type LinkData = {
	label: string
	link: string
} 

export const defaultLinks = [
	{ label: "Home", link: "/" },
	{ label: "Github", link: "https://github.com/rsns-0/5-star-backend" },
	{ label: "Developers", link: "/developers" },
	{ label: "Supported Languages", link: "/languages" },
	{ label: "Reminder Table", link: "/reminder-table" },
	{ label: "About", link: "/about" },
] satisfies LinkData[]
