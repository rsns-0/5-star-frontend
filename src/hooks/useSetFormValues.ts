import { type FieldValues, type UseFormReturn, type Path } from "react-hook-form"

/**
 * A custom hook that sets the values of a form using the provided values object.
 * @template T - The type of the form values object.
 * @param {T} values - The object containing the values to set in the form.
 * @param {UseFormReturn<T>} formContext - The form context object returned by the useForm hook from the react-hook-form library.
 * @returns {() => void} - A function that sets the values of the form using the provided values object.
 */
export function useSetFormValues<T extends FieldValues>(
	values: T,
	formContext: UseFormReturn<T>
): () => void {
	return () => {
		for (const [field, fieldValue] of Object.entries(values)) {
			formContext.setValue(field as Path<T>, fieldValue)
		}
	}
}
