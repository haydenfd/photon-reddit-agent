> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ScheduledMessage

> Result of scheduling a message for future delivery.

Currently only supported by the Slack adapter via `chat.scheduleMessage`.
Other adapters will throw `NotImplementedError` when `schedule()` is called.

## Properties

<ResponseField name={"channelId"} type={"string"} required>
  Channel ID where the message will be posted
</ResponseField>

<ResponseField name={"postAt"} type={"Date"} required>
  When the message will be sent
</ResponseField>

<ResponseField name={"raw"} type={"TRawMessage"} required>
  Platform-specific raw response
</ResponseField>

<ResponseField name={"scheduledMessageId"} type={"string"} required>
  Platform-specific scheduled message ID
</ResponseField>

## Methods

### cancel()

```typescript
cancel(): Promise<void>
```

Cancel the scheduled message before it's sent

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.