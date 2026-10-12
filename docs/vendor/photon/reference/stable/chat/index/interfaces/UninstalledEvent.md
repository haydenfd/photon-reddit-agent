> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# UninstalledEvent

> Installation lifecycle metadata.

Installation lifecycle metadata. Currently emitted by the Teams adapter.

```typescript
interface UninstalledEvent extends InstallationEvent
```

## Properties

<ResponseField name={"action"} type={"\"remove\" | \"remove-upgrade\""} required />

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required />

<ResponseField name={"channelId"} type={"string"}>
  Normalized Chat destination for the installation location, usable with
  `bot.channel(channelId)` and safe to persist for later proactive sends.
  Absent only when the platform supplied no way to reach the conversation.
</ResponseField>

<ResponseField name={"conversationId"} type={"string"} required>
  Platform conversation ID identifying the installation location.
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Platform activity ID, useful for application-level idempotency.
</ResponseField>

<ResponseField name={"locale"} type={"string"} />

<ResponseField name={"raw"} type={"unknown"} required />

<ResponseField name={"tenantId"} type={"string"} />

<ResponseField name={"userId"} type={"string"}>
  Actor who installed or removed the bot, distinct from the bot itself.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.