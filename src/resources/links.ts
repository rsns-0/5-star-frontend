export const DeepLLink = `https://www.deepl.com/en/docs-api`

export type LinkData = {
	label: string
	link: string
}

export const defaultLinks = [
	{ label: "Home", link: "/" },
	{ label: "Developers", link: "/developers" },
	{ label: "Supported Languages", link: "/languages" },
	{ label: "Reminder Table", link: "/reminder-table" },
	// { label: "Github", link: "https://github.com/rsns-0/5-star-backend" }, reinclude later once fully deployed
] satisfies LinkData[]
