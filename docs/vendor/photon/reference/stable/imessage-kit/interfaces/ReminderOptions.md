> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ReminderOptions

> Smart Reminders A user-friendly wrapper around MessageScheduler for setting reminders with natural time expressions.

Smart Reminders

A user-friendly wrapper around MessageScheduler for setting reminders
with natural time expressions.

```ts
import { IMessageSDK, Reminders } from '@photon-ai/imessage-kit'

const sdk = new IMessageSDK()
const reminders = new Reminders(sdk)

// Set reminders with human-readable times
reminders.in('5 minutes', '+1234567890', 'Time to take a break!')
reminders.in('2 hours', '+1234567890', 'Call the client')
reminders.at('5:30pm', '+1234567890', 'Pick up groceries')
reminders.at('tomorrow 9am', '+1234567890', 'Morning standup!')

// List and manage reminders
reminders.list()
reminders.cancel('reminder-id')
```

## Properties

<ResponseField name={"emoji"} type={"string"}>
  Optional emoji prefix (default: ⏰)
</ResponseField>

<ResponseField name={"id"} type={"string"}>
  Optional custom ID
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.