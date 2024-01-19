This command is planned to be used as the name suggests, it will remind you of anything at any time in a selected discord channel, **make sure you have @ping notifications on**, the bot will @ping you when the reminder time is reached. This command has subcommands, check below::

## Set

This subcommand can be used to **set a reminder**, you just need to pass a valid type of time. If you are using this command for the first time, the bot will ask for your timezone and save it for future reminders, you can **change it at any time** later using **/timezone** option.

### Options:

-   **`time:`** **(required)** the time you want to be reminded, can be either a exact time with date and hour or a relative time like in 2 hours. Check example usage below. please use **either relative or absolute time, not both**
-   **`message:`** **(optional)** the message you want to be @pinged for/the reminder. If empty, the bot will ping you with a default message.
-   **`channel:`** **(optional)** the channel you want to pinged in. Select a channel that the bot has access to. If empty, the bot will get the channel you used the command

> **Note:** The bot uses [DayJs](https://day.js.org/en/) as date parser, and a custom function to handle relative times, **in case your input is invalid, the bot will return the actual time**, you might want to see [all possible inputs](https://www.npmjs.com/package/any-date-parser#exhaustive-list-of-date-formats) you can use. You can also check options for relative times in **/Help** section

### Example usage:

-   1d
-   2h 30m
-   10/31/2025 12:35
-   Sun June 28
-   Wednesday, 04 January 2027



## Edit

This subcommand can be used to edit an already existing reminder, you can **edit the message or the time** as you please. After calling this command, the bot will load all your reminders inside of an embed _(might take a few seconds)_, select the one you want to edit and a modal will pop up with 2 fields, one for the time and one for the message, **if you leave the field empty, its value won't change.**

### Options:

_You'll see this options inside the embed after calling the command_

-   **`1st Row of buttons:`** these buttons can skip pages or stop the command if you want
-   **`Selection Field:`** skip to a specific page without pressing buttons repetitively
-   **`2nd Row of buttons:`** each options refers to the each displayed reminder on the embed (if you want to edit the 3rd reminder on the embed, select Option 3 for example)

After selecting an option:

-   **`Message:`** edit the message you want the bot to @ping you for
-   **`Time:`** you can edit time field the same way you did using the **/set** subcommand

> **Note:** the previous value is displayed as placeholder for both fields, if you want to keep it, just leave the field empty, otherwise it will be replaced by the value currently on the field.

### Example usage:



## Help

This subcommand returns an embed explaining how to use the **/reminder** command inside discord and some options, just like **/set** section but with less information.

### Options for relative time:

-   `y` = year
-   `mm` = month
-   `d` = day
-   `h` = hour
-   `m` = minute
-   `ms` = milliseconds

### Example usage:

-   **Relative time usage:**
    -   1y
    -   2h 30m
    -   5mm
    -   1y 2h 30m 5mm 7d
-   **Absolute time usage:**
    -   2020-10-06T17:41:28 GMT+03:00
    -   March 14, 2015 at 9:26:53 am
    -   Wednesday, 01 January 2020
    -   Sunday, June 28

> **Note:** All options are optional, means you don't need to use what you don't want to. and please check out [all possible inputs](https://www.npmjs.com/package/any-date-parser#exhaustive-list-of-date-formats) for more options, and when using the command, use either absolute or relative time, not **both.**



## Timezone

Use this subcommand to set or change your timezone, the bot will give you two lists, one containing all positive timezones and one for negative timezones _(0 is present in both)_ choose the list you prefer and select an option inside it, the bot will store your timezone and use it automatically on the next reminder you **/set**.

### Options:

> **Note:** you don't need to use this command if you don't want to change your current timezone, since the bot will automatically ask for it if you're using the **/reminder** for the first time

