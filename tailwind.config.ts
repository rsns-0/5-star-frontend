import { type Config } from "tailwindcss";

export default {
	corePlugins: {
		preflight: false,
	},
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config
