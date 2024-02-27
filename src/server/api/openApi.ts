import { generateOpenApiDocument } from "trpc-openapi"

import { appRouter } from "./root"
import { env } from "../../env.mjs"

export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: "OpenAPI Spec",
	version: "1.0.0",
	baseUrl: `${env.NEXT_PUBLIC_APP_URL}/api`,
})
