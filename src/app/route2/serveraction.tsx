"use client"
import { Button, Typography } from "@mui/material"
import { useState } from "react"
import SuperJSON from "superjson"
import { getHello, getReminders } from "../../serverActions/p1"
import { useSession } from "next-auth/react"

export const ServerActionPage = () => {
	const state = useState<any>({})
	const session = useSession()
	const r2 = session.data?.user.name

	const onClick = async () => {
		const res = await getReminders(r2)
		const res2 = await getHello()
		state[1]([res, res2])
	}

	return (
		<>
			<Typography>{SuperJSON.stringify(state)}</Typography>
			<Button onClick={onClick}>Click me</Button>
		</>
	)
}
