> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# toPromptEntries

```typescript
toPromptEntries(entries: TranscriptEntry[]): PromptEntry[]
```

Convert an array of [TranscriptEntry](/docs/reference/stable/chat/index/interfaces/TranscriptEntry) (a.k.a. `UserHistoryEntry`)
values into the normalized [PromptEntry](/docs/reference/stable/chat/index/interfaces/PromptEntry) shape expected by LLM SDKs
(e.g. the AI SDK's `CoreMessage`).

Only entries with non-empty text are included. Entry order is preserved
(chronological, oldest first — the natural order returned by
`history.user.list()`).

```typescript
const entries = await chat.history.user.list({ userKey });
const messages = toPromptEntries(entries);
const { text } = await generateText({ model, messages });
```

## Parameters

<ResponseField name={"entries"} type={"TranscriptEntry[]"} required>
  **Type:** <code>[TranscriptEntry](/docs/reference/stable/chat/index/interfaces/TranscriptEntry){"[]"}</code>
</ResponseField>

## Returns

<code>[PromptEntry](/docs/reference/stable/chat/index/interfaces/PromptEntry){"[]"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.