import { PrismaClient } from "@prisma/client";

import { env } from "~/env.mjs";
import extendUser from "./extensions/extendUser"
import guildsAndChannels from "./extensions/guildsAndChannels"
import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
import { type DB } from "../../prisma/prisma/types"

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	})
		.$extends(extendUser)
		.$extends(guildsAndChannels)
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined
}

export const db = globalForPrisma.prisma ?? prismaClientSingleton()

export const db2 = new Kysely<DB>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: process.env.DATABASE_URL,
		}),
	}),
})
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
