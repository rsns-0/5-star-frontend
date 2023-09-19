import { writeFileSync } from "fs"
import { db } from "../src/server/db"
import SuperJSON from "superjson"

async function main() {
	const result = await db.reminders.findMany()
	writeFileSync("testLogs/data.json", SuperJSON.stringify(result))
}
void main()
