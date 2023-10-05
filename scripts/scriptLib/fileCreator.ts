import { exec } from "child_process"
import { endsWithSeparator, makeTitleCase, writeToFile } from "./util"

type StringEndsWithSeparator = `${string}/` | `${string}\\`

type StartsWithDot = `.${string}`

/**
 * Creates a file creator that manages the creation of files.
 *
 * @example
 * const storybookCreator = new FileCreator("src/stories/", ".stories.ts")
 * storybookCreator.createFile("Page", `import { Page } from "./Page`)
 */
export class FileCreator {
	constructor(
		public baseDirectory: StringEndsWithSeparator,
		public fileExtension: StartsWithDot = ".ts"
	) {
		this.validateDirectory()
	}

	fileNamePreProcessor(fileName: string) {
		return fileName
	}

	fileContentPreProcessor(fileContent: string) {
		return fileContent
	}

	createFile(fileName: string, fileContent: string) {
		const fileName2 = this.fileNamePreProcessor(fileName)
		const filePath = `${this.baseDirectory}${fileName2}.${this.fileExtension}`
		const fileContent2 = this.fileContentPreProcessor(fileContent)
		writeToFile(filePath, fileContent2)
		this.postProcessing(filePath)
		return this
	}

	postProcessing(filePath: string) {
		exec(`yarn prettier --write ${filePath}`)
	}

	private validateDirectory() {
		if (!endsWithSeparator(this.baseDirectory)) {
			throw new Error(`Directory ${this.baseDirectory} must end with a separator`)
		}
	}
}

class StorybookCreator extends FileCreator {
	constructor() {
		super("src/stories/", ".stories.tsx")
	}
	override createFile(componentName: string) {
		componentName = makeTitleCase(componentName)
		super.createFile(componentName, this.makeContent(componentName))
		return this
	}
	private makeContent(componentName: string) {
		const fileContent = `import type { Meta, StoryObj } from "@storybook/react"


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<${componentName}> = {
    title: "Comp/DataViewListItem",
    component: ${componentName},
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {},
}`
		return fileContent
	}
}

export const storybookCreator = new StorybookCreator()
