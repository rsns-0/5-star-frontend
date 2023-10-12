"use server"

import { serverRouter } from "../../utils/serverApi"

export async function getReminders(req: any) {
	const res1 = req

	const res2 = await serverRouter.example.hello({ text: "hello world" })
	return {
		res1,
		res2,
	}
}
