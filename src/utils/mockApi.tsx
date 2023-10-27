/* eslint-disable react/display-name */
import type { PropsWithChildren } from "react"
import { useState } from "react"
import { createTRPCReact } from "@trpc/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { type AppRouter } from "~/server/api/root"
import { baseApiConfigs } from "./api"
import { type WrappedComponent } from "../types/types"
import { type TrpcMockContextFactory } from "~/types/types"

// reference: https://stackoverflow.com/questions/75464909/how-to-use-storybook-with-trpc

export const mockedTrpc = createTRPCReact<AppRouter>()
export const MockTrpcProvider = ({ children }: PropsWithChildren) => {
	const reactQueryClient = new QueryClient({
		defaultOptions: { queries: { staleTime: Infinity } },
	})
	const [queryClient] = useState(reactQueryClient)
	const [trpcClient] = useState(() => mockedTrpc.createClient(baseApiConfigs))
	return (
		<mockedTrpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</mockedTrpc.Provider>
	)
}

export type TrpcContext = ReturnType<(typeof mockedTrpc)["useContext"]>

// Hack to be able to access trpcContext
const ActOnTrpcContext = ({
	callback,
	children,
}: PropsWithChildren<{
	callback: (trpcContext: TrpcContext) => void
}>) => {
	const trpcContext = mockedTrpc.useContext()
	callback(trpcContext)
	return <>{children}</>
}

export const withMockTrpcContextStory =
	(callback: (context: TrpcContext) => void) => (Story: React.FC) => (
		<ActOnTrpcContext callback={callback}>
			<Story />
		</ActOnTrpcContext>
	)

export const withMockTrpcContext = <P extends object>(
	Component: WrappedComponent<P>,
	mockTrpcContext: TrpcMockContextFactory
) => {
	return function WithMockTrpcContext(props: P) {
		return (
			<MockTrpcProvider>
				<ActOnTrpcContext callback={mockTrpcContext}>
					<Component {...props} />
				</ActOnTrpcContext>
			</MockTrpcProvider>
		)
	}
}
