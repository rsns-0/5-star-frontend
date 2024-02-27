// import { createNextApiHandler } from "@trpc/server/adapters/next";
import { type NextApiRequest, type NextApiResponse } from "next"
import cors from "nextjs-cors"
import { createOpenApiNextHandler } from "trpc-openapi"
import { appRouter } from "~/server/api/root"
import { createTRPCContext } from "~/server/api/trpc"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await cors(req, res, {
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "*",
		optionsSuccessStatus: 200,
	})
	return createOpenApiNextHandler({
		router: appRouter,
		createContext: createTRPCContext,
	})(req, res)
}

// export API handler
export default handler
