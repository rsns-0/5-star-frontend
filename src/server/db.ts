import { PrismaClient } from "@prisma/client";

import { env } from "~/env.mjs";
import extendUser from "./extensions/extendUser"
import guildsAndChannels from "./extensions/guildsAndChannels"
import { db2 } from "./db2"

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	})
		.$extends(extendUser)
		.$extends(guildsAndChannels)
		.$extends({
			client: {
				db2,
			},
		})
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined
}

export const db = globalForPrisma.prisma ?? prismaClientSingleton()


if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
