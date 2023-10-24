import { type ActionIconProps, type ElementProps, type ButtonProps } from "@mantine/core"
import { type TablerIconsProps } from "@tabler/icons-react"
import { type RouterOutputs } from "../utils/api"
import { type z } from "zod"
import {
	type remindersCreateSchema,
	type remindersUpdateFormSchema,
} from "../models/validationSchemas"

export type Providers = "discord"

export interface SupportedLanguageData {
	id: string | number
	name: string
	icon: string
	discordIconLabel: string
	countryName: string
	supported: boolean
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

export type ParametersO<T> = T extends (...args: infer U) => any ? U[0] : never

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
export type ReminderUpdateFormData = z.infer<typeof remindersUpdateFormSchema>
export type ReminderCreateFormData = z.infer<typeof remindersCreateSchema>
