import { makeAutoObservable } from "mobx"

class TableStateModel {
	isOpen = false
	formItemId: null | number = null

	constructor() {
		makeAutoObservable(this)
	}

	get title() {
		return this.isEditing ? "Edit Reminder" : "Create Reminder"
	}

	get isEditing() {
		return this.formItemId !== null
	}

	get isCreating() {
		return this.formItemId === null
	}

	openEdit(id: number) {
		this.isOpen = true
		this.formItemId = id
	}

	openCreate() {
		this.isOpen = true
		this.formItemId = null
	}

	close() {
		this.isOpen = false
		this.formItemId = null
	}
}

export const tableStateModel = new TableStateModel()
