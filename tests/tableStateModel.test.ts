import { describe, expect, it } from "vitest"
import { TableStateModel } from "../src/models/TableStateModel"

class ModelStateTester {
	constructor(public model: TableStateModel) {}

	expectClosed() {
		expect(this.model.isOpen).toBe(false)
		expect(this.model.isClosed).toBe(true)
		expect(this.model.isEditing).toBe(false)
		expect(this.model.isCreating).toBe(false)
		expect(this.currentItemidValueIsValidForClosed()).toBe(true)
		expect(this.model.title).toBeDefined()
	}

	expectEditing(id: number) {
		expect(this.model.isOpen).toBe(true)
		expect(this.model.isClosed).toBe(false)
		expect(this.model.isEditing).toBe(true)
		expect(this.model.isCreating).toBe(false)
		expect(this.model.currentItemId).toBe(id)
		expect(this.model.title).toBe("Edit Reminder")
	}

	expectCreating() {
		expect(this.model.isOpen).toBe(true)
		expect(this.model.isClosed).toBe(false)
		expect(this.model.isEditing).toBe(false)
		expect(this.model.isCreating).toBe(true)
		expect(this.model.currentItemId).toBe(null)
		expect(this.model.title).toBe("Create Reminder")
	}

	private currentItemidValueIsValidForClosed() {
		return this.model.currentItemId === null || typeof this.model.currentItemId === "number"
	}
}

describe("tableStateModel", () => {
	let model: TableStateModel
	let modelTester: ModelStateTester
	beforeEach(() => {
		model = new TableStateModel()
		modelTester = new ModelStateTester(model)
	})
	it("should initialize with proper values", () => {
		expect(model.isOpen).toBe(false)
		expect(model.isEditing).toBe(false)
	})

	it("state should be in editing mode after opening edit", () => {
		model.openEdit(1)
		expect(model.isEditing).toBe(true)
	})

	it("state should be in creating mode after opening create", () => {
		model.openCreate()
		expect(model.isCreating).toBe(true)
	})

	it("computed states should be congruent with each other after interactions with the model", () => {
		const itemId = 1
		modelTester.expectClosed()
		model.openEdit(itemId)
		modelTester.expectEditing(itemId)
		model.close()
		modelTester.expectClosed()
		model.openCreate()
		modelTester.expectCreating()
		model.close()
		modelTester.expectClosed()
	})
})
