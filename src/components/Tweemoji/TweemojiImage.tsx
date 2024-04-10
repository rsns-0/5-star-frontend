import Script from "next/script"
import React, { createContext, useContext, useState } from "react"
import { useRef, useEffect } from "react"

interface Twemoji {
	parse: (text: string) => string
}

declare global {
	interface Window {
		twemoji: Twemoji | undefined
	}
}

export const TwemojiImage = ({ emoji }: { emoji: string }) => {
	const imgRef = useTweemojiImage(emoji)
	return <div ref={imgRef} />
}

const TwemojiContext = createContext<Twemoji | undefined>(undefined)

export const TwemojiProvider = ({ children }: { children: React.ReactNode }) => {
	const [twemoji, setTwemoji] = useState<Twemoji | undefined>(undefined)

	return (
		<>
			<Script
				src="https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js"
				crossOrigin="anonymous"
				onLoad={() => setTwemoji(window.twemoji)}
			/>
			<TwemojiContext.Provider value={twemoji}>{children}</TwemojiContext.Provider>
		</>
	)
}

/** Dynamically modifies the ref'd element into an img element with Tweemoji icon. */
const useTweemojiImage = (emoji: string) => {
	const imgRef = useRef<HTMLImageElement>(null)
	const twemoji = useContext(TwemojiContext)

	useEffect(() => {
		if (imgRef.current && twemoji === undefined) {
			imgRef.current.textContent = emoji
			return
		}
		if (imgRef.current && twemoji !== undefined) {
			imgRef.current.innerHTML = twemoji.parse(emoji)
		}
	}, [emoji, twemoji])

	return imgRef
}
