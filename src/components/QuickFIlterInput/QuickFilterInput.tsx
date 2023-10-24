import { TextInput, type TextInputProps } from "@mantine/core"

export const QuickFilterInput = (props: TextInputProps) => {
	return (
		<TextInput
			styles={{ label: { color: "white" } }}
			label="Quick Filter"
			placeholder="Search the entire table..."
			w={400}
			{...props}
		/>
	)
}
