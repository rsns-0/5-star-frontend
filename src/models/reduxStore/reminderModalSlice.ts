import { createSlice } from "@reduxjs/toolkit"

export const reminderModalSlice = createSlice({
	name: "reminderModal",
	initialState: {
		open: false,
	},
	reducers: {
		openModal: () => {
			return { open: true }
		},
		closeModal: () => {
			return { open: false }
		},
	},
})
export const { openModal, closeModal } = reminderModalSlice.actions
export default reminderModalSlice.reducer
