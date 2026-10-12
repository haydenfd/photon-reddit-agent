> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ThreadHistoryCache

> Persistent per-thread history cache backed by the StateAdapter.

Used by adapters that lack server-side message history APIs (e.g. WhatsApp,
Telegram). Messages are atomically appended via `state.appendToList()`,
which is safe without holding a thread lock.

Distinct from the cross-platform per-user [TranscriptsApi](/docs/reference/stable/chat/index/interfaces/TranscriptsApi) (see
`transcripts.ts`) — this cache is keyed by thread, not user.

## Constructor

```typescript
ThreadHistoryCache(state: StateAdapter, config?: ThreadHistoryConfig): ThreadHistoryCache
```

### Parameters

<ResponseField name={"state"} type={"StateAdapter"} typeHref={"/reference/stable/chat/index/interfaces/StateAdapter"} required />

<ResponseField name={"config"} type={"ThreadHistoryConfig"} typeHref={"/reference/stable/chat/index/interfaces/ThreadHistoryConfig"} />

### Returns

<code>[ThreadHistoryCache](/docs/reference/stable/chat/index/classes/ThreadHistoryCache)</code>

## Methods

### append()

```typescript
append(threadId: string, message: Message): Promise<void>
```

Atomically append a message to the history for a thread.
Trims to maxMessages (keeps newest) and refreshes TTL.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"message"} type={"Message"} typeHref={"/reference/stable/chat/index/classes/Message"} required />

#### Returns

`Promise<void>`

### getMessages()

```typescript
getMessages(threadId: string, limit?: number): Promise<Message<unknown>[]>
```

Get messages for a thread in chronological order (oldest first).

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread ID
</ResponseField>

<ResponseField name={"limit"} type={"number"}>
  Optional limit on number of messages to return (returns newest N)
</ResponseField>

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>[]>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.