import { makeAutoObservable } from "mobx"

class TableStateModel {
	private open = false
	private formItemId: null | number = null

	constructor() {
		makeAutoObservable(this) //private variables fine with makeAutoObservable https://github.com/mobxjs/mobx/discussions/2490
	}

	get isOpen() {
		return this.open
	}

	get currentItemId() {
		return this.formItemId
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
		this.open = true
		this.formItemId = id
	}

	openCreate() {
		this.open = true
		this.formItemId = null
	}

	close() {
		this.open = false
	}
}

export const tableStateModel = new TableStateModel()
