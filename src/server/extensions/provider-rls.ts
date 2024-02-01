import { Prisma } from "@prisma/client"

export function withReminderRLS(userId: string) {
	return Prisma.defineExtension((prisma) => {
		return prisma.$extends({
			query: {
				reminders: {
					async $allOperations({ args, query }) {
						if ("where" in args && args.where) {
							args.where.user_id = userId
						}

						return query(args)
					},
				},
			},
		})
	})
}
