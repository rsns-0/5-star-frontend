import { type UseAutocompleteProps } from "@mui/material"

export type DefaultUseAutocompleteProps<T> = UseAutocompleteProps<
	T,
	undefined,
	undefined,
	undefined
>


export type GetArrayItem<T> = T extends Array<infer U> ? U : never

export type ParametersO<T> = T extends (...args: infer U) => any ? U[0] : never