import Link from "next/link"
import { TitleText } from "../components/typography/TitleText"
import {
	Box,
	Center,
	Code,
	Container,
	Divider,
	List,
	Stack,
	type StackProps,
	Text,
	Title,
	type TitleProps,
	type DividerProps,
} from "@mantine/core"
import { ButtonWithModal } from "../components/containers/ButtonWithModal"
import { openApiSchemaLink } from "../resources/links"
import { BorderCard } from "../components/card/BorderCard"

function TitleSection({
	children,
}: {
	children?: React.ReactNode
	titleProps?: TitleProps
	dividerProps?: DividerProps
}) {
	return (
		<Box>
			<Title order={2} style={{ fontSize: "1.6rem" }} c="white">
				{children}
			</Title>
			<Divider color="blue.8" size="md" />
		</Box>
	)
}

function Article({
	children,
	title,
	stackProps,
}: {
	children?: React.ReactNode
	title?: React.ReactNode
	stackProps?: StackProps
}) {
	return (
		<article>
			<Stack gap="1.5rem" {...stackProps}>
				<TitleSection>{title}</TitleSection>
				{children}
			</Stack>
		</article>
	)
}

function HistogramDocumentation() {
	return (
		<Stack gap="1.5rem">
			<TitleSection titleProps={{ order: 3 }}>Context</TitleSection>
			<Text>
				Datasets from different sources often describe a set of attributes belonging to
				distinct entities and will have string labels describing them. We used fuzzy
				matching of string labels in addition to other methods such as associated universal
				identifier codes to establish relationships across multiple sources. The related
				string labels can now be used collectively to automate correction of data input,
				improve discovery of related context with data access, and be used other application
				contexts.
			</Text>
			<TitleSection titleProps={{ order: 3 }}>Interpreting the Data</TitleSection>
			<Text>
				Refer to the <Link href={openApiSchemaLink}>OpenAPI schema</Link>. There is
				typically a right-skewed distribution in the data. Some key points:
			</Text>
			<List>
				<List.Item>
					Data clusters represent aggregation groups formed from string labels with
					exactly the same string content, respective to their associated entities.
				</List.Item>
				<List.Item>
					The <Code>mode_count</Code> and the <Code>mode_score</Code> can be used to check
					for competing clusters. The <Code>mode_count</Code> is the number of clusters
					matching the value of the mode, while the <Code>mode_score</Code> is a
					normalized value describing the confidence that the distribution is unimodal in
					nature.
				</List.Item>
				<List.Item>
					A larger number of samples in a cluster generally increases the reliability of
					the data, especially for data points on the right side of the skew.
				</List.Item>
				<List.Item>
					Datasets with a low standard deviation in string similarity often indicate the
					presence of errors or inconsistencies, like typos, artifact presence, or
					misspellings (given the nature of how the data was sourced and how these
					phenomena affect the string length).
				</List.Item>
				<List.Item>
					Clusters with a high <Code>sample_size</Code> but a low <Code>mode_score</Code>{" "}
					may suggest alternative, significant labels for an entity.
				</List.Item>
			</List>
			<Text>
				If you want to retrieve high quality samples of text labels (least likely to be
				erroneous or containing artifacts), focus on clusters with a high frequency of
				occurrence. They will be useful in automated entity recognition for applications
				such as AI or data quality checks.
			</Text>
			<Text>
				If you want to pick a consistent name to represent an entity for your applications
				that facilitates automated recognition, select the most common label (mode) from
				sets with a <Code>mode_score</Code> of 1 and a high <Code>sample_size</Code>.
			</Text>
			<Stack gap="2rem">
				<TitleSection titleProps={{ order: 3 }}>Formulas</TitleSection>
				<Title order={4}>Similarity Score</Title>
				<Code>levenshtein_distance / max(len(a), len(b))</Code>
				<Text>
					The <Code>levenshtein_distance</Code> measures the total number of
					updates/deletes/inserts to change string <Code>a</Code> to string <Code>b</Code>
					.
				</Text>
				<Title order={4}>Mode Score</Title>
				<Code>
					max_cluster_frequency / sum(filter(cluster_frequencies, ≥
					0.5*max_cluster_frequency))
				</Code>
				<Text>
					The formula (very roughly) establishes an inversely proportional relationship
					between the mode and any other entries that are significant in size relative to
					the mode to describe how "unimodal-like" the dataset is.
				</Text>
			</Stack>
		</Stack>
	)
}

export default function Page() {
	return (
		<Container py="1rem">
			<Stack ml="3rem" gap="3rem">
				<BorderCard mb="0.5rem">
					<Stack gap="1rem">
						<Center>
							<TitleText order={1} fz="3rem">
								Data API
							</TitleText>
						</Center>
						<Text>
							Are you a developer or data scientist? We serve incidental data found
							while processing data for this application. Check out our{" "}
							<Link href={openApiSchemaLink}>OpenAPI</Link> spec in your preferred
							OpenAPI editor client (such as{" "}
							<Link href="https://editor.swagger.io/">Swagger Editor</Link>) for
							details. A summary of the API endpoints and their use cases is below.
						</Text>
					</Stack>
				</BorderCard>
				<Article title="country-languages">
					<Text>
						Provides countries and their estimated primary languages based on
						aggregation of currently available data within our database. Limited to
						countries whose primary language has an ISO 639-1 or ISO 639-2 code. Useful
						for i18n.
					</Text>
				</Article>
				<Article title={"{domain name}-histograms"}>
					<Text>
						These endpoints provide histogram data of string labels for the specific
						domain indicated by their name, and provides supplementary data related to
						its string similarity compared to every other item in the same set. This can
						be useful for discovery of idioms or alternative labels for an entity for
						automated construction of relationships.
					</Text>
					<Box className="ml-auto">
						<ButtonWithModal
							buttonProps={{ maw: "fit-content" }}
							buttonText="Learn More"
							title="Reading the Histogram Data"
							modalProps={{ size: "80vw" }}
						>
							<HistogramDocumentation />
						</ButtonWithModal>
					</Box>
				</Article>
			</Stack>
		</Container>
	)
}
