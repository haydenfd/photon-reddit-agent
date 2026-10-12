> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageDeletedEvent

> Message delete event fired when a platform reports that a message was deleted.

Message delete event fired when a platform reports that a message was
deleted. The deleted message body is usually unavailable; adapters include
`previousMessage` when the platform supplied enough data to parse it.

## Properties

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required>
  The adapter that received the event
</ResponseField>

<ResponseField name={"channelId"} type={"string"} required>
  Platform/channel identifier from the adapter event
</ResponseField>

<ResponseField name={"deletedAt"} type={"Date"}>
  When the delete event happened, if supplied by the platform
</ResponseField>

<ResponseField name={"messageId"} type={"string"} required>
  The deleted platform-native message ID
</ResponseField>

<ResponseField name={"platform"} type={"string"} required>
  Adapter name, e.g. "slack"
</ResponseField>

<ResponseField name={"previousMessage"} type={"Message<TRawMessage>"}>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

  Previous message snapshot, if supplied by the platform
</ResponseField>

<ResponseField name={"raw"} type={"unknown"} required>
  Platform-specific raw delete event
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required>
  Thread containing the deleted message
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.