import { forwardRef, useImperativeHandle, useState } from "react"

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { type ICellEditorParams } from "ag-grid-community"
import { DateTime } from "luxon"

import { type reminders } from "@prisma/client"

interface DateCellEditorRef {
	getValue(): DateTime
}

function DatePickerMUI(
	props: ICellEditorParams<reminders, DateTime>,
	ref: React.Ref<DateCellEditorRef>
) {
	const [value, setValue] = useState<DateTime>(props.value ?? DateTime.now())

	function handleChange(newValue: DateTime | null) {
		if (newValue === null) {
			return
		}

		setValue(newValue)
	}

	useImperativeHandle(ref, () => {
		return {
			getValue() {
				if (!value) {
					throw new Error("unknown error")
				}

				return value
			},
		}
	})

	return <DateTimePicker value={value} onChange={handleChange} />
}

export default forwardRef(DatePickerMUI)
