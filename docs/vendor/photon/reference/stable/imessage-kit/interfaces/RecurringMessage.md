> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# RecurringMessage

> Recurring scheduled message

```typescript
interface RecurringMessage extends ScheduledMessageBase
```

## Properties

<ResponseField name={"content"} type={"string | { files: string[]; images: string[]; text: string }"} required>
  Message content
</ResponseField>

<ResponseField name={"createdAt"} type={"Date"} required>
  Creation timestamp
</ResponseField>

<ResponseField name={"endAt"} type={"Date"}>
  End date (optional - runs forever if not set)
</ResponseField>

<ResponseField name={"error"} type={"string"}>
  Error message if failed
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Unique ID for this scheduled message
</ResponseField>

<ResponseField name={"interval"} type={"RecurrenceInterval"} typeHref={"/reference/stable/imessage-kit/types/RecurrenceInterval"} required>
  Recurrence interval
</ResponseField>

<ResponseField name={"nextSendAt"} type={"Date"} required>
  Next scheduled time
</ResponseField>

<ResponseField name={"result"} type={"SendResult"} typeHref={"/reference/stable/imessage-kit/interfaces/SendResult"}>
  Send result if successful
</ResponseField>

<ResponseField name={"sendAt"} type={"Date"} required>
  When to send
</ResponseField>

<ResponseField name={"sendCount"} type={"number"} required>
  Number of times sent
</ResponseField>

<ResponseField name={"status"} type={"ScheduledMessageStatus"} typeHref={"/reference/stable/imessage-kit/types/ScheduledMessageStatus"} required>
  Current status
</ResponseField>

<ResponseField name={"to"} type={"string"} required>
  Recipient (phone, email, or chatId)
</ResponseField>

<ResponseField name={"type"} type={"\"recurring\""} required />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.