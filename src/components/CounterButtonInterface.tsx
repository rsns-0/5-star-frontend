import { Button } from "@mui/material"
import { useCounterStore } from "../models/counter-store/counter"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
export default function CounterButtonInterface() {
	const { add, subtract, interval } = useCounterStore()

	return (
		<>
			<Grid container={true} spacing={4}>
				<Grid>
					<Button
						type="button"
						variant="contained"
						title="Increment Button"
						onClick={() => add(interval)}
					>
						Increment
					</Button>
				</Grid>
				<Grid>
					<Button
						type="button"
						title="Decrement Button"
						variant="contained"
						onClick={() => subtract(interval)}
					>
						Decrement
					</Button>
				</Grid>
			</Grid>
		</>
	)
}
