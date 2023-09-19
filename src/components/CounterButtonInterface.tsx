import { Button } from "@mui/material"
import { useCounterStore } from "../models/counter-store/counter"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
export default function CounterButtonInterface() {
	const add = useCounterStore((s) => s.add)
	const subtract = useCounterStore((s) => s.subtract)

	return (
		<>
			<Grid container={true} spacing={4}>
				<Grid>
					<Button
						type="button"
						variant="contained"
						title="Increment Button"
						onClick={add}
					>
						Increment
					</Button>
				</Grid>
				<Grid>
					<Button
						type="button"
						title="Decrement Button"
						variant="contained"
						onClick={() => subtract()}
					>
						Decrement
					</Button>
				</Grid>
			</Grid>
		</>
	)
}
