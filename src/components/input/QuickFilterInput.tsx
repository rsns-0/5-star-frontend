import { TextInput, type TextInputProps } from "@mantine/core"
import { useInputState } from "@mantine/hooks"

export function QuickFilterInput(props: TextInputProps) {
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

export function useQuickFilterInput(initialValue = "") {
	const [value, setValue] = useInputState(initialValue)

	const inputProps = {
		value,
		onChange: setValue,
	}

	return {
		value,
		setValue,
		inputProps,
	}
}
