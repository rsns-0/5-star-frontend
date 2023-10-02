import React, { useState } from "react"
import { AutoComplete, type AutoCompleteCompleteEvent } from "primereact/autocomplete"

export default function BasicDemo() {
	const [value, setValue] = useState<string>("")
	const [items, setItems] = useState<string[]>([])

	const search = (event: AutoCompleteCompleteEvent) => {
		setItems([...Array(10).keys()].map((item) => event.query + "-" + item))
	}

	return (
		<div className="card justify-content-center flex">
			<AutoComplete
				value={value}
				suggestions={items}
				completeMethod={search}
				onChange={(e) => setValue(e.value)}
			/>
		</div>
	)
}
