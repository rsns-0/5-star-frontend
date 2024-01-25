import { PiCaretCircleDoubleRightFill } from "react-icons/pi"
import CustomTitle from "../CustomTitle/CustomTitle"

export const TranslatorDocumentation = () => {
	const BulletDropIcon = <PiCaretCircleDoubleRightFill />
	return (
		<>
			<p>
				To use the translator, simply react in the message you want to translate with the
				flag_emoji of the language you want to be translated to.
			</p>
			<CustomTitle icon={BulletDropIcon} iconSize={20} order={3} iconColor="#006b3f">
				Process
			</CustomTitle>
			<ul>
				<li>Right click on the message</li>
				<li>
					Select the option to <code>Add Reaction</code>
				</li>
				<li>
					Go the standard &quot;Flags&quot; section <em>(the last section)</em>
				</li>
				<li>
					If you want to translate the message to spanish <em>(for example)</em> simply
					react with the :flag_es: emoji.
				</li>
			</ul>
			<p>You will receive a reply with the translated message to the destined language</p>
			<p>
				We use the <a href="https://www.deepl.com/docs-api/translate-text">DeepL API</a> to
				translate messages.
			</p>
		</>
	)
}
