> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# TranscriptsApi

> Cross-platform per-user message store.

Distinct from the existing per-thread `threadHistory` config (which exists
to backfill thread context for adapters that lack server-side history APIs).
The Transcripts API is keyed by a resolved cross-platform user key and is
intended for transcript-style use cases (LLM context building, audit).

## Methods

### append()

```typescript
append(thread: Postable<TState, TRawMessage>, message: Message<unknown> | AppendInput, options?: AppendOptions): Promise<TranscriptEntry | null>
```

Persist a Message (or AppendInput) under the user key.

* For Message: `userKey` is read from the Message instance (set by the
  SDK during inbound dispatch via the configured IdentityResolver).
  No-op if the Message has no `userKey` (resolver returned null).
* For AppendInput: `options.userKey` is required.

#### Parameters

<ResponseField name={"thread"} type={"Postable<TState, TRawMessage>"} required>
  **Type:** <code>[Postable](/docs/reference/stable/chat/index/interfaces/Postable){"<TState, TRawMessage>"}</code>
</ResponseField>

<ResponseField name={"message"} type={"Message<unknown> | AppendInput"} required>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown> | "}[AppendInput](/docs/reference/stable/chat/index/interfaces/AppendInput)</code>
</ResponseField>

<ResponseField name={"options"} type={"AppendOptions"} typeHref={"/reference/stable/chat/index/interfaces/AppendOptions"} />

#### Returns

<code>{"Promise<"}[TranscriptEntry](/docs/reference/stable/chat/index/interfaces/TranscriptEntry){" | null>"}</code>

### count()

```typescript
count(query: CountQuery): Promise<number>
```

Total stored count for a user key.

#### Parameters

<ResponseField name={"query"} type={"CountQuery"} typeHref={"/reference/stable/chat/index/interfaces/CountQuery"} required />

#### Returns

`Promise<number>`

### delete()

```typescript
delete(target: DeleteTarget): Promise<{ deleted: number }>
```

GDPR / DSR delete — wipes every stored message under the user key.

#### Parameters

<ResponseField name={"target"} type={"DeleteTarget"} typeHref={"/reference/stable/chat/index/interfaces/DeleteTarget"} required />

#### Returns

`Promise<{ deleted: number }>`

### list()

```typescript
list(query: ListQuery): Promise<TranscriptEntry[]>
```

Returns the most recent entries in chronological order (oldest first),
capped at `query.limit` (default 50).

Pagination is intentionally not supported — the store keeps at most
`transcripts.maxPerUser` entries per user. To widen the window, raise
`maxPerUser`; to fetch a different slice, narrow with `threadId` /
`platforms` / `roles`.

#### Parameters

<ResponseField name={"query"} type={"ListQuery"} typeHref={"/reference/stable/chat/index/interfaces/ListQuery"} required />

#### Returns

<code>{"Promise<"}[TranscriptEntry](/docs/reference/stable/chat/index/interfaces/TranscriptEntry){"[]>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.