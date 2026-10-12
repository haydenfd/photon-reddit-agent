> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChannelHistoryApi

> Per-channel history sub-API.

Per-channel history sub-API.
Provides access to channel-level messages and thread listings.

## Methods

### listMessages()

```typescript
listMessages(channelId: string, options?: FetchOptions): Promise<FetchResult<unknown>>
```

Fetch top-level messages in a channel (not thread replies).
Delegates to `adapter.fetchChannelMessages` when available. Adapters
that persist history in the SDK-side store (`persistThreadHistory`)
are served from the channel-keyed cache instead.

#### Parameters

<ResponseField name={"channelId"} type={"string"} required />

<ResponseField name={"options"} type={"FetchOptions"} typeHref={"/reference/stable/chat/index/interfaces/FetchOptions"} />

#### Returns

<code>{"Promise<"}[FetchResult](/docs/reference/stable/chat/index/interfaces/FetchResult){"<unknown>>"}</code>

### listThreads()

```typescript
listThreads(channelId: string, options?: ListThreadsOptions): Promise<ListThreadsResult<unknown>>
```

List threads in a channel.
Delegates to `adapter.listThreads`.

#### Parameters

<ResponseField name={"channelId"} type={"string"} required />

<ResponseField name={"options"} type={"ListThreadsOptions"} typeHref={"/reference/stable/chat/index/interfaces/ListThreadsOptions"} />

#### Returns

<code>{"Promise<"}[ListThreadsResult](/docs/reference/stable/chat/index/interfaces/ListThreadsResult){"<unknown>>"}</code>

### listThreadsWithMessages()

```typescript
listThreadsWithMessages(channelId: string, options?: { cursor: string; maxThreads: number; messagesPerThread: number }): Promise<{ nextCursor: string; threads: { messages: Message<unknown>[]; threadId: string }[] }>
```

Convenience: list threads and fetch messages for each in parallel.
Fetches up to `maxThreads` (default 5) threads, then `messagesPerThread`
messages per thread.

#### Parameters

<ResponseField name={"channelId"} type={"string"} required />

<ResponseField name={"options"} type={"{ cursor: string; maxThreads: number; messagesPerThread: number }"} />

#### Returns

<code>{"Promise<{ nextCursor: string; threads: { messages: "}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>[]; threadId: string }[] }>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.