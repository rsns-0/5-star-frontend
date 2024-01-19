import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
	//@ts-expect-error should be compatible
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		outputFile: { json: "testLogs/testResults.json" },
		reporters: ["json", "default"],
	},
	resolve: {
		alias: {
			jest: "vi",
			"~": "./src",
		},
	},
})
