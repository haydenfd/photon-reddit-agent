> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ThreadHistoryApi

> Per-thread message history sub-API.

Per-thread message history sub-API.
Provides message listing and collection for a single thread.

## Methods

### append()

```typescript
append(threadId: string, message: Message): Promise<void>
```

Append a message to the local SDK-side thread history cache.
Only relevant for adapters with `persistThreadHistory: true`.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"message"} type={"Message"} typeHref={"/reference/stable/chat/index/classes/Message"} required />

#### Returns

`Promise<void>`

### collect()

```typescript
collect(threadId: string, options?: { limit: number }): AsyncIterable<Message<unknown>>
```

Async generator that yields all messages in chronological order,
handling pagination automatically.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"options"} type={"{ limit: number }"} />

#### Returns

<code>{"AsyncIterable<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>"}</code>

### list()

```typescript
list(threadId: string, options?: FetchOptions): Promise<FetchResult<unknown>>
```

Fetch a single page of messages from a thread.
Delegates to the adapter's `fetchMessages`; adapters that persist
history in the SDK-side store (`persistThreadHistory`) fall back to
that cache when the platform returns nothing.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"options"} type={"FetchOptions"} typeHref={"/reference/stable/chat/index/interfaces/FetchOptions"} />

#### Returns

<code>{"Promise<"}[FetchResult](/docs/reference/stable/chat/index/interfaces/FetchResult){"<unknown>>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.