> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Adapter

> Adapter interface with generics for platform-specific types.

## Properties

<ResponseField name={"botUserId"} type={"string"}>
  Bot user ID for platforms that use IDs in mentions (e.g., Slack's \<@U123>)
</ResponseField>

<ResponseField name={"lockScope"} type={"LockScope"} typeHref={"/reference/stable/chat/index/types/LockScope"}>
  Default lock scope for this adapter.

  * `'thread'` (default): lock per threadId
  * `'channel'`: lock per channelId (for channel-based platforms like WhatsApp, Telegram)

  Can be overridden by `ChatConfig.lockScope`.
</ResponseField>

<ResponseField name={"name"} type={"string"} required>
  Unique name for this adapter (e.g., "slack", "teams")
</ResponseField>

<ResponseField name={"persistMessageHistory"} type={"boolean"} />

<ResponseField name={"persistThreadHistory"} type={"boolean"}>
  When true, the SDK persists per-thread message history in the state
  adapter for this platform. Use for platforms that lack server-side
  message history APIs (e.g. WhatsApp, Telegram).
</ResponseField>

<ResponseField name={"supportsTurnCancellation"} type={"boolean"}>
  Whether active turns should be published for cross-process cancellation.
</ResponseField>

<ResponseField name={"userName"} type={"string"} required>
  Bot username (can override global userName)
</ResponseField>

## Methods

### addReaction()

```typescript
addReaction(threadId: string, messageId: string, emoji: string | EmojiValue): Promise<void>
```

Add a reaction to a message

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"messageId"} type={"string"} required />

<ResponseField name={"emoji"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`Promise<void>`

### channelIdFromThreadId()

```typescript
channelIdFromThreadId(threadId: string): string
```

Derive channel ID from a thread ID.
Default fallback: first two colon-separated parts (e.g., "slack:C123").
Adapters with different structures should override this.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`string`

### decodeThreadId()

```typescript
decodeThreadId(threadId: string): TThreadId
```

Decode thread ID string back to platform-specific data

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`TThreadId`

### deleteMessage()

```typescript
deleteMessage(threadId: string, messageId: string): Promise<void>
```

Delete a message

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"messageId"} type={"string"} required />

#### Returns

`Promise<void>`

### disconnect()

```typescript
disconnect(): Promise<void>
```

Cleanup hook called when Chat instance is shutdown

#### Returns

`Promise<void>`

### editMessage()

```typescript
editMessage(threadId: string, messageId: string, message: AdapterPostableMessage): Promise<RawMessage<TRawMessage>>
```

Edit an existing message

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"messageId"} type={"string"} required />

<ResponseField name={"message"} type={"AdapterPostableMessage"} typeHref={"/reference/stable/chat/index/types/AdapterPostableMessage"} required />

#### Returns

<code>{"Promise<"}[RawMessage](/docs/reference/stable/chat/index/interfaces/RawMessage){"<TRawMessage>>"}</code>

### editObject()

```typescript
editObject(threadId: string, messageId: string, kind: string, data: unknown): Promise<RawMessage<TRawMessage>>
```

Edit a previously posted object (Plan, Poll, etc.).
If not implemented, object updates will throw PlanNotSupportedError.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread containing the message
</ResponseField>

<ResponseField name={"messageId"} type={"string"} required>
  The message ID to edit
</ResponseField>

<ResponseField name={"kind"} type={"string"} required>
  The object kind (e.g., "plan")
</ResponseField>

<ResponseField name={"data"} type={"unknown"} required>
  The object data (type depends on kind)
</ResponseField>

#### Returns

<code>{"Promise<"}[RawMessage](/docs/reference/stable/chat/index/interfaces/RawMessage){"<TRawMessage>>"}</code>

### encodeThreadId()

```typescript
encodeThreadId(platformData: TThreadId): string
```

Encode platform-specific data into a thread ID string

#### Parameters

<ResponseField name={"platformData"} type={"TThreadId"} required />

#### Returns

`string`

### endTyping()

```typescript
endTyping(threadId: string, status?: AgentSessionStatus): Promise<void>
```

Clear a typing/processing indicator after a reply finishes.

Optional because most platforms clear typing indicators automatically.
Agent-session platforms can implement this to transition the session back
to an active state.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"status"} type={"AgentSessionStatus"} typeHref={"/reference/stable/chat/index/types/AgentSessionStatus"} />

#### Returns

`Promise<void>`

### fetchChannelInfo()

```typescript
fetchChannelInfo(channelId: string): Promise<ChannelInfo>
```

Fetch channel info/metadata.

#### Parameters

<ResponseField name={"channelId"} type={"string"} required />

#### Returns

<code>{"Promise<"}[ChannelInfo](/docs/reference/stable/chat/index/interfaces/ChannelInfo){">"}</code>

### fetchChannelMessages()

```typescript
fetchChannelMessages(channelId: string, options?: FetchOptions): Promise<FetchResult<TRawMessage>>
```

Fetch channel-level messages (top-level, not thread replies).
For example, Slack's conversations.history vs conversations.replies.

#### Parameters

<ResponseField name={"channelId"} type={"string"} required />

<ResponseField name={"options"} type={"FetchOptions"} typeHref={"/reference/stable/chat/index/interfaces/FetchOptions"} />

#### Returns

<code>{"Promise<"}[FetchResult](/docs/reference/stable/chat/index/interfaces/FetchResult){"<TRawMessage>>"}</code>

### fetchMessage()

```typescript
fetchMessage(threadId: string, messageId: string): Promise<Message<TRawMessage> | null>
```

Fetch a single message by ID.
Optional - adapters that don't implement this will return null.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread ID containing the message
</ResponseField>

<ResponseField name={"messageId"} type={"string"} required>
  The platform-specific message ID
</ResponseField>

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage> | null>"}</code>

The message, or null if not found/not supported

### fetchMessages()

```typescript
fetchMessages(threadId: string, options?: FetchOptions): Promise<FetchResult<TRawMessage>>
```

Fetch messages from a thread.

**Direction behavior:**

* `backward` (default): Fetches the most recent messages. Use this for loading
  a chat view. The `nextCursor` points to older messages.
* `forward`: Fetches the oldest messages first. Use this for iterating through
  message history. The `nextCursor` points to newer messages.

**Message ordering:**
Messages within each page are always returned in chronological order (oldest first),
regardless of direction. This is the natural reading order for chat messages.

```typescript
// Load most recent 50 messages for display
const recent = await adapter.fetchMessages(threadId, { limit: 50 });
// recent.messages: [older, ..., newest] in chronological order

// Paginate backward to load older messages
const older = await adapter.fetchMessages(threadId, {
  limit: 50,
  cursor: recent.nextCursor,
});

// Iterate through all history from the beginning
const history = await adapter.fetchMessages(threadId, {
  limit: 100,
  direction: 'forward',
});
```

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"options"} type={"FetchOptions"} typeHref={"/reference/stable/chat/index/interfaces/FetchOptions"} />

#### Returns

<code>{"Promise<"}[FetchResult](/docs/reference/stable/chat/index/interfaces/FetchResult){"<TRawMessage>>"}</code>

### fetchSubject()

```typescript
fetchSubject(raw: TRawMessage): Promise<MessageSubject | null>
```

#### Parameters

<ResponseField name={"raw"} type={"TRawMessage"} required />

#### Returns

<code>{"Promise<"}[MessageSubject](/docs/reference/stable/chat/index/interfaces/MessageSubject){" | null>"}</code>

### fetchThread()

```typescript
fetchThread(threadId: string): Promise<ThreadInfo>
```

Fetch thread metadata

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

<code>{"Promise<"}[ThreadInfo](/docs/reference/stable/chat/index/interfaces/ThreadInfo){">"}</code>

### getChannelVisibility()

```typescript
getChannelVisibility(threadId: string): ChannelVisibility
```

Get the visibility scope of a channel containing the thread.

This distinguishes between private channels, workspace-visible channels,
and externally shared channels (e.g., Slack Connect).

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread ID to check
</ResponseField>

#### Returns

<code>[ChannelVisibility](/docs/reference/stable/chat/index/types/ChannelVisibility)</code>

The channel visibility scope

### getUser()

```typescript
getUser(userId: string): Promise<UserInfo | null>
```

Look up user information by user ID.
Optional — not all platforms support this.

#### Parameters

<ResponseField name={"userId"} type={"string"} required>
  Platform-specific user ID
</ResponseField>

#### Returns

<code>{"Promise<"}[UserInfo](/docs/reference/stable/chat/index/interfaces/UserInfo){" | null>"}</code>

User info, or null if user not found

### handleWebhook()

```typescript
handleWebhook(request: Request, options?: WebhookOptions): Promise<Response>
```

Handle incoming webhook request

#### Parameters

<ResponseField name={"request"} type={"Request"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

#### Returns

`Promise<Response>`

### initialize()

```typescript
initialize(chat: ChatInstance): Promise<void>
```

Called when Chat instance is created (internal use)

#### Parameters

<ResponseField name={"chat"} type={"ChatInstance"} typeHref={"/reference/stable/chat/index/interfaces/ChatInstance"} required />

#### Returns

`Promise<void>`

### isDM()

```typescript
isDM(threadId: string): boolean
```

Check if a thread is a direct message conversation.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread ID to check
</ResponseField>

#### Returns

`boolean`

True if the thread is a DM, false otherwise

### listThreads()

```typescript
listThreads(channelId: string, options?: ListThreadsOptions): Promise<ListThreadsResult<TRawMessage>>
```

List threads in a channel.

#### Parameters

<ResponseField name={"channelId"} type={"string"} required />

<ResponseField name={"options"} type={"ListThreadsOptions"} typeHref={"/reference/stable/chat/index/interfaces/ListThreadsOptions"} />

#### Returns

<code>{"Promise<"}[ListThreadsResult](/docs/reference/stable/chat/index/interfaces/ListThreadsResult){"<TRawMessage>>"}</code>

### markAsRead()

```typescript
markAsRead(threadId: string, messageId: string, message?: Message<TRawMessage>): Promise<void>
```

Send a read receipt for an inbound message.

Optional: `Thread.markAsRead()` throws `NotImplementedError` when an
adapter leaves this out. The full message is passed alongside its ID when
the caller has one, so adapters can read platform data off `message.raw`
instead of resolving the ID themselves.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  Thread containing the message
</ResponseField>

<ResponseField name={"messageId"} type={"string"} required>
  ID of the message to acknowledge
</ResponseField>

<ResponseField name={"message"} type={"Message<TRawMessage>"}>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

  The message itself, when the caller has it
</ResponseField>

#### Returns

`Promise<void>`

### onThreadSubscribe()

```typescript
onThreadSubscribe(threadId: string): Promise<void>
```

Optional hook called when a thread is subscribed to.
Adapters can use this to set up platform-specific subscriptions
(e.g., Google Chat Workspace Events).

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<void>`

### openDM()

```typescript
openDM(userId: string): Promise<string>
```

Open a direct message conversation with a user.

```typescript
const dmThreadId = await adapter.openDM("U123456");
await adapter.postMessage(dmThreadId, "Hello!");
```

#### Parameters

<ResponseField name={"userId"} type={"string"} required>
  The platform-specific user ID
</ResponseField>

#### Returns

`Promise<string>`

The thread ID for the DM conversation

### openModal()

```typescript
openModal(triggerId: string, modal: ModalElement, contextId?: string): Promise<{ viewId: string }>
```

Open a modal/dialog form.

#### Parameters

<ResponseField name={"triggerId"} type={"string"} required>
  Platform-specific trigger ID from the action event
</ResponseField>

<ResponseField name={"modal"} type={"ModalElement"} typeHref={"/reference/stable/chat/index/interfaces/ModalElement"} required>
  The modal element to display
</ResponseField>

<ResponseField name={"contextId"} type={"string"}>
  Optional context ID for server-side stored thread/message context
</ResponseField>

#### Returns

`Promise<{ viewId: string }>`

The view/dialog ID

### parseMessage()

```typescript
parseMessage(raw: TRawMessage): Message<TRawMessage>
```

Parse platform message format to normalized format

#### Parameters

<ResponseField name={"raw"} type={"TRawMessage"} required />

#### Returns

<code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

### postChannelMessage()

```typescript
postChannelMessage(channelId: string, message: AdapterPostableMessage): Promise<RawMessage<TRawMessage>>
```

Post a message to channel top-level (not in a thread).

#### Parameters

<ResponseField name={"channelId"} type={"string"} required />

<ResponseField name={"message"} type={"AdapterPostableMessage"} typeHref={"/reference/stable/chat/index/types/AdapterPostableMessage"} required />

#### Returns

<code>{"Promise<"}[RawMessage](/docs/reference/stable/chat/index/interfaces/RawMessage){"<TRawMessage>>"}</code>

### postEphemeral()

```typescript
postEphemeral(threadId: string, userId: string, message: AdapterPostableMessage, options?: PostEphemeralOptions): Promise<EphemeralMessage<TRawMessage> | null>
```

Post a message visible only to a specific user, natively or via an explicit fallback.

This is optional - if not implemented, Thread.postEphemeral will
fall back to openDM + postMessage when fallbackToDM is true.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread to post in
</ResponseField>

<ResponseField name={"userId"} type={"string"} required>
  The user who should see the message
</ResponseField>

<ResponseField name={"message"} type={"AdapterPostableMessage"} typeHref={"/reference/stable/chat/index/types/AdapterPostableMessage"} required>
  The message content
</ResponseField>

<ResponseField name={"options"} type={"PostEphemeralOptions"} typeHref={"/reference/stable/chat/index/interfaces/PostEphemeralOptions"} />

#### Returns

<code>{"Promise<"}[EphemeralMessage](/docs/reference/stable/chat/index/interfaces/EphemeralMessage){"<TRawMessage> | null>"}</code>

EphemeralMessage with usedFallback indicating private delivery, or null if unsupported

### postMessage()

```typescript
postMessage(threadId: string, message: AdapterPostableMessage): Promise<RawMessage<TRawMessage>>
```

Post a message to a thread

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"message"} type={"AdapterPostableMessage"} typeHref={"/reference/stable/chat/index/types/AdapterPostableMessage"} required />

#### Returns

<code>{"Promise<"}[RawMessage](/docs/reference/stable/chat/index/interfaces/RawMessage){"<TRawMessage>>"}</code>

### postObject()

```typescript
postObject(threadId: string, kind: string, data: unknown): Promise<RawMessage<TRawMessage>>
```

Post a special object (Plan, Poll, etc.) as a single message.
If not implemented, posting such objects will throw PlanNotSupportedError.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread to post to
</ResponseField>

<ResponseField name={"kind"} type={"string"} required>
  The object kind (e.g., "plan")
</ResponseField>

<ResponseField name={"data"} type={"unknown"} required>
  The object data (type depends on kind)
</ResponseField>

#### Returns

<code>{"Promise<"}[RawMessage](/docs/reference/stable/chat/index/interfaces/RawMessage){"<TRawMessage>>"}</code>

### rehydrateAttachment()

```typescript
rehydrateAttachment(attachment: Attachment): Attachment
```

Reconstruct fetchData on an attachment after deserialization.
Called during message rehydration for queue/debounce strategies.
Uses fetchMetadata and adapter auth context to rebuild the download closure.

#### Parameters

<ResponseField name={"attachment"} type={"Attachment"} typeHref={"/reference/stable/chat/index/interfaces/Attachment"} required />

#### Returns

<code>[Attachment](/docs/reference/stable/chat/index/interfaces/Attachment)</code>

### removeReaction()

```typescript
removeReaction(threadId: string, messageId: string, emoji: string | EmojiValue): Promise<void>
```

Remove a reaction from a message

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"messageId"} type={"string"} required />

<ResponseField name={"emoji"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`Promise<void>`

### renderFormatted()

```typescript
renderFormatted(content: Root): string
```

Render formatted content to platform-specific string

#### Parameters

<ResponseField name={"content"} type={"Root"} typeHref={"/reference/stable/chat/index/interfaces/Root"} required />

#### Returns

`string`

### reply()

```typescript
reply(threadId: string, messageId: string, message: AdapterPostableMessage): Promise<RawMessage<TRawMessage>>
```

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"messageId"} type={"string"} required />

<ResponseField name={"message"} type={"AdapterPostableMessage"} typeHref={"/reference/stable/chat/index/types/AdapterPostableMessage"} required />

#### Returns

<code>{"Promise<"}[RawMessage](/docs/reference/stable/chat/index/interfaces/RawMessage){"<TRawMessage>>"}</code>

### scheduleMessage()

```typescript
scheduleMessage(threadId: string, message: AdapterPostableMessage, options: { postAt: Date }): Promise<ScheduledMessage<TRawMessage>>
```

Schedule a message for future delivery.

Optional — only supported by adapters with native scheduling APIs (e.g., Slack).
Thread.schedule() will throw NotImplementedError if this method is absent.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread to post in
</ResponseField>

<ResponseField name={"message"} type={"AdapterPostableMessage"} typeHref={"/reference/stable/chat/index/types/AdapterPostableMessage"} required>
  The message content
</ResponseField>

<ResponseField name={"options"} type={"{ postAt: Date }"} required>
  Scheduling options including the target delivery time
</ResponseField>

#### Returns

<code>{"Promise<"}[ScheduledMessage](/docs/reference/stable/chat/index/interfaces/ScheduledMessage){"<TRawMessage>>"}</code>

A ScheduledMessage with cancel() capability

### startTyping()

```typescript
startTyping(threadId: string, status?: string, options?: TypingOptions): Promise<void>
```

Show typing indicator

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"status"} type={"string"} />

<ResponseField name={"options"} type={"TypingOptions"} typeHref={"/reference/stable/chat/index/interfaces/TypingOptions"} />

#### Returns

`Promise<void>`

### stream()

```typescript
stream(threadId: string, textStream: AsyncIterable<string | StreamChunk>, options?: StreamOptions): Promise<RawMessage<TRawMessage> | null>
```

Stream a message using platform-native streaming APIs.

The adapter consumes the async iterable and handles the entire streaming lifecycle.
Available on platforms with native streaming or preview APIs.
Adapters may return `null` before consuming any chunks to delegate back to
Chat SDK's built-in post+edit fallback for the current thread.

The stream can yield plain strings (text chunks) or [StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk) objects
for rich content like task progress cards. Adapters that don't support structured
chunks will extract text from `markdown_text` chunks and ignore other types.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  The thread to stream to
</ResponseField>

<ResponseField name={"textStream"} type={"AsyncIterable<string | StreamChunk>"} required>
  **Type:** <code>{"AsyncIterable<string | "}[StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk){">"}</code>

  Async iterable of text chunks or structured StreamChunk objects
</ResponseField>

<ResponseField name={"options"} type={"StreamOptions"} typeHref={"/reference/stable/chat/index/interfaces/StreamOptions"}>
  Platform-specific streaming options
</ResponseField>

#### Returns

<code>{"Promise<"}[RawMessage](/docs/reference/stable/chat/index/interfaces/RawMessage){"<TRawMessage> | null>"}</code>

The raw message after streaming completes, or `null` to use core fallback


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.