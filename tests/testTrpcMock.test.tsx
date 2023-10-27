import { test } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { api } from "../src/utils/api"
import { withMockTrpcContext } from "../src/utils/mockApi"
import { type TrpcMockContextFactory } from "~/types/types"

const TestComponent1 = ({ prop1 }: { prop1: string }) => {
	const { data } = api.example.hello.useQuery({ text: "asd" })

	return (
		<main role="main">
			<p data-testid={"greeting"}>{data?.greeting}</p>
			<p data-testid={"prop1"}>{prop1}</p>
		</main>
	)
}
const trpcMockContextFactory: TrpcMockContextFactory = (ctx) => {
	ctx.example.hello.setData({ text: "asd" }, () => {
		return { greeting: "hello" }
	})
}

const WrappedTestComponent1 = withMockTrpcContext(TestComponent1, trpcMockContextFactory)

test("TRPC mock functionality test", () => {
	render(<WrappedTestComponent1 prop1={"111"} />)

	const main = within(screen.getByRole("main"))
	const greeting = main.getByTestId("greeting")
	const prop1 = main.getByTestId("prop1")
	expect(greeting.textContent).toBe("hello")
	expect(prop1.textContent).toBe("111")
})

const TestComponent2 = () => {
	const { data } = api.reminderRouter.get.getReminderById.useQuery(1)
	return <p data-testid="test">{data?.id}</p>
}

const WrappedTestComponent2 = withMockTrpcContext(TestComponent2, (ctx) => {
	ctx.reminderRouter.get.getReminderById.setData(1, () => {
		return { id: 10 } as any
	})
})

test("TRPC mock functionality test with protected endpoint", () => {
	render(<WrappedTestComponent2 />)

	expect(screen.getByTestId("test").textContent).toBe("10")
})
