import { type Providers } from "./../../types/auth"
import { Prisma } from "@prisma/client"
import extendUser from "./extendUser"

export function bypassRLS() {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
							query(args),
						])
						return result
					},
				},
			},
		})
	)
}

export function withProviderRLS(provider: Providers) {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.current_company_id', ${provider}, TRUE)`,
							query(args),
						])
						return result
					},
				},
			},
		})
	)
}

export function withReminderRLS(userId: string) {
	return Prisma.defineExtension((prisma) => {
		const { getUserProviderAccountId } = prisma.$extends(extendUser).account
		return prisma.$extends({
			query: {
				reminders: {
					async findMany({ args, query }) {
						// enforces that the user can only access their own reminders
						if ("where" in args && args.where) {
							const result = await getUserProviderAccountId(userId, "discord")
							if (result instanceof Error) {
								throw result
							}
							args.where.user_id = result
						}

						return query(args)
					},
				},
			},
		})
	})
}
