"use client"
import { Box } from "@mantine/core"
import { type ReactNode } from "react"
import { SimpleGrid, Grid } from "@mantine/core"

import classes from "./FeaturesTitle.module.css"

type FeatureGrid = {
	titleComponent?: JSX.Element
	children: ReactNode
}

/** Provide a component representing the title to include a title for the grid. The title will be presented above the grid.*/
export default function FeatureGrid({ titleComponent, children }: FeatureGrid) {
	return (
		<Box className={classes.wrapper}>
			<Grid gutter={80}>
				{titleComponent && <Grid.Col span={12}>{titleComponent}</Grid.Col>}
				<Grid.Col span={12}>
					<SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
						{children}
					</SimpleGrid>
				</Grid.Col>
			</Grid>
		</Box>
	)
}
