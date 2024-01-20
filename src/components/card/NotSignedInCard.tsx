import InfoCard from "./InfoCard"

import { SignInButton } from "../buttons/SignInButton"

export default function NotSignedInCard({ scale = 1 }) {
	return (
		<InfoCard
			body={<SignInButton />}
			header="You are not signed in."
			paperProps={{
				style: { transform: `scale(${scale})` },
			}}
		/>
	)
}
