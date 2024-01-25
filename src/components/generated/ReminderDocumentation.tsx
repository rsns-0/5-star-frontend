import { Image, Blockquote } from "@mantine/core"
import CustomTitle from "../CustomTitle/CustomTitle"
import { IoInformationCircleOutline } from "react-icons/io5"
import { SimpleButton } from "../buttons/SimpleButton"
import { SelectionButton } from "../buttons/SelectionButton"
import styles from "./ReminderDocumentation.module.css"
import { PiCaretCircleDoubleRightFill } from "react-icons/pi"

export const ReminderDocumentation = () => {
	const BulletDropIcon = <PiCaretCircleDoubleRightFill />
	const infoIcon = <IoInformationCircleOutline size={25} />
	return (
		<>
			<p>
				The reminder feature may be used to set a reminder, which upon expiry, will cause
				the bot to send you a notification in the channel you had set the reminder in. You
				may use use either our discord-integrated dialog interface, or the table interface
				we offer on the website intended for more complex data management.{" "}
				<strong>
					Be sure to have notifications enabled on the Discord client to receive
					reminders.
				</strong>
			</p>

			<CustomTitle icon={BulletDropIcon} divider={true} iconSize={30} iconColor="#12e773">
				Subcommands
			</CustomTitle>

			<CustomTitle icon={BulletDropIcon} iconSize={25} order={2} iconColor="#34b536">
				Set
			</CustomTitle>
			<p>
				This subcommand can be used to <strong>set a reminder</strong>, you just need to
				pass a valid type of time. If you are using this command for the first time, the bot
				will ask for your timezone and save it for future reminders, you can{" "}
				<strong>change it at any time</strong> later using <strong>/timezone</strong>{" "}
				option.
			</p>
			<CustomTitle icon={BulletDropIcon} iconSize={20} order={3} iconColor="#006b3f">
				Options
			</CustomTitle>

			<ul>
				<li>
					<strong>
						<code>time:</code>
					</strong>{" "}
					<strong>(required)</strong> the time you want to be reminded, can be either a
					exact time with date and hour or a relative time like in 2 hours. Check example
					usage below. please use{" "}
					<strong>either relative or absolute time, not both</strong>
				</li>
				<li>
					<strong>
						<code>message:</code>
					</strong>{" "}
					<strong>(optional)</strong> the message you want to be @pinged for/the reminder.
					If empty, the bot will ping you with a default message.
				</li>
				<li>
					<strong>
						<code>channel:</code>
					</strong>{" "}
					<strong>(optional)</strong> the channel you want to pinged in. Select a channel
					that the bot has access to. If empty, the bot will get the channel you used the
					command
				</li>
			</ul>
			<Blockquote color="blue.8" icon={infoIcon} iconSize={25} p="md" m="xl">
				The bot uses <a href="https://day.js.org/en/">DayJs</a> as date parser, and a custom
				function to handle relative times,{" "}
				<strong>in case your input is invalid, the bot will return the actual time</strong>,
				you might want to see{" "}
				<a href="https://www.npmjs.com/package/any-date-parser#exhaustive-list-of-date-formats">
					all possible inputs
				</a>{" "}
				you can use. You can also check options for relative times in <strong>/Help</strong>{" "}
				section
			</Blockquote>
			<CustomTitle icon={BulletDropIcon} iconSize={20} order={3} iconColor="#12e773">
				Example usage:
			</CustomTitle>

			<ul>
				<li>1d</li>
				<li>2h 30m</li>
				<li>10/31/2025 12:35</li>
				<li>Sun June 28</li>
				<li>Wednesday, 04 January 2027</li>
			</ul>
			<CustomTitle icon={BulletDropIcon} iconSize={25} order={2} iconColor="#34b536">
				Edit
			</CustomTitle>

			<p>
				This subcommand can be used to edit an already existing reminder, you can{" "}
				<strong>edit the message or the time</strong> as you please. After calling this
				command, the bot will load all your reminders inside of an embed{" "}
				<em>(might take a few seconds)</em>, select the one you want to edit and a modal
				will pop up with 2 fields, one for the time and one for the message,{" "}
				<strong>if you leave the field empty, its value won&#39;t change.</strong>
			</p>
			<CustomTitle icon={BulletDropIcon} iconSize={20} order={3} iconColor="#12e773">
				Options
			</CustomTitle>

			<p>
				<em>You&#39;ll see this options inside the embed after calling the command</em>
			</p>
			<ul className={styles.div}>
				<li>
					<SimpleButton>⏪</SimpleButton> Return 5 pages
				</li>
				<li>
					<SimpleButton>◀️</SimpleButton> Return 1 page
				</li>
				<li>
					<SimpleButton>▶️</SimpleButton> Advance 1 page
				</li>
				<li>
					<SimpleButton>⏩</SimpleButton> Advance 5 pages
				</li>
				<li>
					<SimpleButton color="red.7">⏹️</SimpleButton> Cancel
				</li>
				<li>
					<SelectionButton>Make a selection</SelectionButton> Use this selection box to
					skip to a specific page
				</li>
				<li>
					<SimpleButton>Option X</SimpleButton> each option refers to the each displayed
					reminder on the embed (if you want to edit the 3rd reminder on the embed, select{" "}
					Option 3 for example)
				</li>
			</ul>
			<p>After selecting an option:</p>
			<ul>
				<li>
					<strong>
						<code>Message:</code>
					</strong>{" "}
					edit the message you want the bot to @ping you for
				</li>
				<li>
					<strong>
						<code>Time:</code>
					</strong>{" "}
					you can edit time field the same way you did using the <strong>/set</strong>{" "}
					subcommand
				</li>
			</ul>
			<Blockquote color="blue.8" icon={infoIcon} iconSize={25} p="md" m="xl">
				The previous value is displayed as placeholder for both fields, if you want to keep
				it, just leave the field empty, otherwise it will be replaced by the value currently
				on the field.
			</Blockquote>
			<CustomTitle icon={BulletDropIcon} iconSize={25} order={2} iconColor="#34b536">
				Help
			</CustomTitle>
			<p>
				This subcommand returns an embed explaining how to use the{" "}
				<strong>/reminder</strong> command inside discord and some options, just like{" "}
				<strong>/set</strong> section but with less information.
			</p>
			<CustomTitle icon={BulletDropIcon} iconSize={20} order={3} iconColor="#12e773">
				Options for relative time:
			</CustomTitle>

			<ul>
				<li>
					<code>y</code> = year
				</li>
				<li>
					<code>mm</code> = month
				</li>
				<li>
					<code>d</code> = day
				</li>
				<li>
					<code>h</code> = hour
				</li>
				<li>
					<code>m</code> = minute
				</li>
				<li>
					<code>ms</code> = milliseconds
				</li>
			</ul>
			<CustomTitle icon={BulletDropIcon} iconSize={20} order={3} iconColor="#12e773">
				Example usage:
			</CustomTitle>
			<ul>
				<li>
					<strong>Relative time usage:</strong>
					<ul>
						<li>1y</li>
						<li>2h 30m</li>
						<li>5mm</li>
						<li>1y 2h 30m 5mm 7d</li>
					</ul>
				</li>
				<li>
					<strong>Absolute time usage:</strong>
					<ul>
						<li>2020-10-06T17:41:28 GMT+03:00</li>
						<li>March 14, 2015 at 9:26:53 am</li>
						<li>Wednesday, 01 January 2020</li>
						<li>Sunday, June 28</li>
					</ul>
				</li>
			</ul>
			<Blockquote color="blue.8" icon={infoIcon} iconSize={25} p="md" m="xl">
				<p>
					All options are optional, means you don&#39;t need to use what you don&#39;t
					want to. and please check out{" "}
					<a href="https://www.npmjs.com/package/any-date-parser#exhaustive-list-of-date-formats">
						all possible inputs
					</a>{" "}
					for more options, when using the command, use either absolute or relative time,{" "}
					<strong>not both.</strong>
				</p>
			</Blockquote>
			<CustomTitle icon={BulletDropIcon} iconSize={25} order={2} iconColor="#34b536">
				Timezone
			</CustomTitle>

			<p>
				Use this subcommand to set or change your timezone, the bot will give you two lists,
				one containing all positive timezones and one for negative timezones{" "}
				<em>(0 is present in both)</em> choose the list you prefer and select an option
				inside it, the bot will store your timezone and use it automatically on the next
				reminder you <strong>/set</strong>.
			</p>

			<Blockquote color="blue.8" icon={infoIcon} iconSize={25} p="md" m="xl">
				You don&#39;t need to use this command if you don&#39;t want to change your current
				timezone, since the bot will automatically ask for it if you&#39;re using the{" "}
				<strong>/reminder</strong> for the first time
			</Blockquote>
			<Image alt="Image of reminder feature" src="/reminder-demo.png" maw="28rem" />

			<CustomTitle icon={BulletDropIcon} divider={true} iconSize={30} iconColor="#12e773">
				Table Interface
			</CustomTitle>
			<ul>
				<li>
					After signing in, you will be greeted with a data table which has the standard
					filtering/sorting functionalities associated with data tables, as well as a
					quick filter input to allow full text search across all columns.
				</li>
				<li>
					Hover over interactive components to discover more information about their
					functionality and intended usages.
				</li>
				<li>
					To create a reminder, click on the &quot;Create New&quot; button and fill out
					the modal fields. You may also edit existing reminders by clicking on the
					&quot;Edit&quot; button on the row of the reminder you wish to edit. You may
					also delete reminders by clicking on the &quot;Delete&quot; button on the row of
					the reminder you wish to delete.
				</li>
				<li>
					To add column-specific filters, hover over a column header to reveal a burger
					icon which will open a menu with column-specific filtering options.
				</li>
				<li>
					To add column-specific sorting, click on the column header to sort the column in
					ascending order. Click on the column header again to sort the column in
					descending order. You may introduce multiple levels of sorting by holding down
					the shift key while clicking on the column headers.
				</li>
				<li>Columns can be resized by dragging the edges of the column headers.</li>
				<li>
					Column and filter adjustments can be reset by utilizing the &quot;Reset
					Columns&quot; button.
				</li>
			</ul>
			<Image alt="Image of reminder table" src="/reminder-table-demo.png" />
		</>
	)
}
