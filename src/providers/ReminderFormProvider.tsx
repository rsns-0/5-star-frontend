import { _ReminderFormProviderImpl, useReminderForm } from "../hooks/reminderForm"

import { memo } from "react"
import { type WrappedComponent, type PropsAreEqual, type HocReturn } from "../types/types"
import { createDefaultReminderFieldValues } from "../lib/createDefaultReminderFieldValues"

export function ReminderFormProvider({ children }: { children: React.ReactNode }) {
	const form = useReminderForm({
		defaultValues: createDefaultReminderFieldValues(),
	})
	return <_ReminderFormProviderImpl form={form}>{children}</_ReminderFormProviderImpl>
}

export const withReminderFormProvider = <P extends object>(
	Component: WrappedComponent<P>,
	propsAreEqual?: PropsAreEqual<P> | false,

	componentName = Component.displayName ?? Component.name
): HocReturn<P> => {
	function WithReminderFormProvider(props: P) {
		return (
			<ReminderFormProvider>
				<Component {...props} />
			</ReminderFormProvider>
		)
	}

	WithReminderFormProvider.displayName = `withHoC(${componentName})`

	const wrappedComponent =
		propsAreEqual === false
			? WithReminderFormProvider
			: memo(WithReminderFormProvider, propsAreEqual)

	return wrappedComponent as typeof WithReminderFormProvider
}
