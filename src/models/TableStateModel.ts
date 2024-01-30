import { makeAutoObservable } from "mobx"

export class TableStateModel {
	private open = false
	private formItemId: null | number = null

	constructor() {
		makeAutoObservable(this)
	}

	get isOpen() {
		return this.open
	}

	get isClosed() {
		return !this.isOpen
	}

	get currentItemId() {
		return this.formItemId
	}

	get title() {
		if (this.isOpen) {
			return this.formItemId === null ? "Create Reminder" : "Edit Reminder"
		}
		return ""
	}

	get isEditing() {
		return this.formItemId !== null && this.isOpen
	}

	get isCreating() {
		return this.formItemId === null && this.isOpen
	}

	openEdit(id: number) {
		this.open = true
		this.formItemId = id
	}

	openCreate() {
		this.open = true
		this.formItemId = null
	}

	close() {
		this.open = false
		this.formItemId = null
	}
}

export const tableStateModel = new TableStateModel()
