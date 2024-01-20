import type { Meta, StoryObj } from "@storybook/react"
import NotSignedInCard from "../components/card/NotSignedInCard"
import { within, userEvent, expect } from "@storybook/test"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/SignedInCard",
	component: NotSignedInCard,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof NotSignedInCard>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	play: async (ctx) => {
		const canvas = within(ctx.canvasElement)
		await expect(canvas.getByText("not signed in", { exact: false })).toBeInTheDocument()
		await userEvent.click(canvas.getByRole("link"))
	},
}
