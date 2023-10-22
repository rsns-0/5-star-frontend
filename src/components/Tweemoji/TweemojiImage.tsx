import { useRef, useEffect } from "react"
import twemoji from "twemoji"

export const TwemojiImage = ({ emoji }: { emoji: string }) => {
	const imgRef = useTweemojiImage(emoji)

	return <div ref={imgRef} />
}

/** Dynamically modifies the ref'd element into an img element with Tweemoji icon. */
const useTweemojiImage = (emoji: string) => {
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		if (imgRef.current) {
			imgRef.current.innerHTML = twemoji.parse(emoji)
		}
	}, [emoji])

	return imgRef
}
