import { useInputState } from "@mantine/hooks"

export const useInput = (initialValue = "") => {
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
