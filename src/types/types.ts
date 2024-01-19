import { type ActionIconProps, type ElementProps, type ButtonProps } from "@mantine/core"
import { type TablerIconsProps } from "@tabler/icons-react"
import { type RouterOutputs } from "../utils/api"
import { type z } from "zod"
import {
	type remindersServerCreateSchema,
	type remindersFormSchema,
} from "../models/validationSchemas"
import { type TrpcContext } from "~/utils/mockApi"
import { type getCountryPrimaryLanguageData } from "../server/queries/getCountryPrimaryLanguageData"

export type Providers = "discord"

export type PrimaryLanguageData = Awaited<ReturnType<typeof getCountryPrimaryLanguageData>>[number]

export interface SupportedLanguageData {
	id: string | number
	language: string
	icon: string
	discordIconLabel: string
	countryName: string
	supported: boolean
	ISO1: string | null
	ISO2: string
	ISO2B: string | null
	CCA2: string
	CCA3: string
	weight: number
}

export interface IconButtonProps
	extends ActionIconProps,
		ElementProps<"button", keyof ButtonProps> {
	iconProps?: TablerIconsProps
}

export type GetAllDevelopersOutput = RouterOutputs["developerInfo"]["getAllDeveloperProfiles"]

export type ChannelData = RouterOutputs["discordRouter"]["getGuildsAndTextBasedChannelsOfUser"]

export type ReminderData = RouterOutputs["reminderRouter"]["get"]["getAllReminders"][0]

export type ReminderColDef = ReminderData & {
	actions?: any
}

export type GetArrayItem<T> = T extends Array<infer U> ? U : never

/** Defaults to the first function argument. Index starts at 0. */
export type GetFunctionArgument<T, UArgumentNumber extends number = 0> = T extends (
	...args: infer U
) => any
	? U[UArgumentNumber]
	: never

export type ReminderTableProps = {
	title?: string
	modalEditingTitle?: string
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type PropsAreEqual<P> = (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean

export type WrappedComponent<P> = {
	(props: P): Exclude<React.ReactNode, undefined>
	displayName?: string
}

export type HocReturn<P> = {
	(props: P): React.JSX.Element
	displayName: string
}
export type ReminderUpdateFormData = z.infer<typeof remindersFormSchema>
export type ReminderCreateFormData = z.infer<typeof remindersServerCreateSchema>
export type TrpcMockContextFactory = (context: TrpcContext) => void
export interface DeveloperInfo {
	id: string
	src: string | null
	name: string
	role: string
}

