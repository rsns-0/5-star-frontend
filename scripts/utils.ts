type LogArgs<TResult> = {
	logStrategy?: (result: TResult) => void
}

export function log<TMethod extends (...args: any[]) => any>({
	logStrategy,
}: LogArgs<ReturnType<TMethod>> = {}) {
	return function (_: any, __: any, descriptor: PropertyDescriptor) {
		const targetMethod: TMethod = descriptor.value

		descriptor.value = function (...args: any[]) {
			const result: ReturnType<TMethod> = targetMethod.apply(this, args)
			if (logStrategy) {
				logStrategy(result)
				return result
			}
			console.log(result)
			return result
		}
	}
}

export function asyncLog<TMethod extends (...args: any[]) => any>({
	logStrategy,
}: LogArgs<Awaited<ReturnType<TMethod>>> = {}) {
	return function (_: any, __: any, descriptor: PropertyDescriptor) {
		const targetMethod: TMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			const result: Awaited<ReturnType<TMethod>> = await targetMethod.apply(this, args)
			if (logStrategy) {
				logStrategy(result)
				return result
			}
			console.log(result)
			return result
		}
	}
}
