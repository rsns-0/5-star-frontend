interface TableState {
	title: string
	initialize: () => void
	openDialog: () => void
	closeDialog: () => void
}

interface Dialog {
	write: () => void
}
