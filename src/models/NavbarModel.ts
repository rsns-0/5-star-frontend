import { makeAutoObservable } from "mobx"

class NavbarModel {
	isOpen = false
	constructor() {
		makeAutoObservable(this)
	}

	toggle() {
		this.isOpen = !this.isOpen
	}
	open() {
		this.isOpen = true
	}
	close() {
		this.isOpen = false
	}
}

export const navbarModel = new NavbarModel()
