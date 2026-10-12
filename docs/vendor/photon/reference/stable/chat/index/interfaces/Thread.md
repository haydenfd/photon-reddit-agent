> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Thread

> Thread interface with support for custom state.

Thread interface with support for custom state.
Extends Postable for shared message posting capabilities.

```typescript
interface Thread extends Postable<TState, TRawMessage>
```

## Properties

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required>
  The adapter this entity belongs to
</ResponseField>

<ResponseField name={"allMessages"} type={"AsyncIterable<Message<TRawMessage>>"} required>
  **Type:** <code>{"AsyncIterable<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>>"}</code>

  Async iterator for all messages in the thread.
  Messages are yielded in chronological order (oldest first).
  Automatically handles pagination.
</ResponseField>

<ResponseField name={"channel"} type={"Channel<TState, TRawMessage>"} required>
  **Type:** <code>[Channel](/docs/reference/stable/chat/index/interfaces/Channel){"<TState, TRawMessage>"}</code>

  Get the Channel containing this thread
</ResponseField>

<ResponseField name={"channelId"} type={"string"} required>
  Channel/conversation ID
</ResponseField>

<ResponseField name={"channelVisibility"} type={"ChannelVisibility"} typeHref={"/reference/stable/chat/index/types/ChannelVisibility"} required>
  The visibility scope of this channel
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Unique ID
</ResponseField>

<ResponseField name={"isDM"} type={"boolean"} required>
  Whether this is a direct message conversation
</ResponseField>

<ResponseField name={"messages"} type={"AsyncIterable<Message<TRawMessage>>"} required>
  **Type:** <code>{"AsyncIterable<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>>"}</code>

  Iterate messages newest first (backward from most recent).
  Auto-paginates lazily — only fetches pages as consumed.
</ResponseField>

<ResponseField name={"recentMessages"} type={"Message<TRawMessage>[]"} required>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>[]"}</code>

  Recently fetched messages (cached)
</ResponseField>

<ResponseField name={"signal"} type={"AbortSignal"} required>
  Aborted when the platform or application stops the active turn.

  Pass this to AI/model APIs so cancellation stops upstream generation, not
  only message delivery.
</ResponseField>

<ResponseField name={"state"} type={"Promise<TState | null>"} required>
  Get the current state.
  Returns null if no state has been set.
</ResponseField>

## Methods

### createSentMessageFromMessage()

```typescript
createSentMessageFromMessage(message: Message<TRawMessage>): SentMessage<TRawMessage>
```

Wrap a Message object as a SentMessage with edit/delete capabilities.
Used internally for reconstructing messages from serialized data.

#### Parameters

<ResponseField name={"message"} type={"Message<TRawMessage>"} required>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>
</ResponseField>

#### Returns

<code>[SentMessage](/docs/reference/stable/chat/index/interfaces/SentMessage){"<TRawMessage>"}</code>

### getParticipants()

```typescript
getParticipants(): Promise<Author[]>
```

Get the unique human participants in this thread.

Scans all messages in the thread and returns deduplicated authors,
excluding the bot itself. Useful for deciding whether to subscribe
based on how many humans are participating — subscribe when it's a
1:1 conversation, unsubscribe when others join so humans can talk
without the bot replying to every message.

```typescript
// Subscribe only when one person is talking to the bot
bot.onNewMention(async (thread, message) => {
  const participants = await thread.getParticipants();
  if (participants.length === 1) {
    await thread.subscribe();
    await thread.post("I'm here to help!");
  }
});

// Unsubscribe when the thread becomes a group conversation
bot.onSubscribedMessage(async (thread, message) => {
  const participants = await thread.getParticipants();
  if (participants.length > 1) {
    await thread.unsubscribe();
    return;
  }
  await thread.post("Still here to help!");
});
```

#### Returns

<code>{"Promise<"}[Author](/docs/reference/stable/chat/index/interfaces/Author){"[]>"}</code>

Array of unique non-bot authors

### isSubscribed()

```typescript
isSubscribed(): Promise<boolean>
```

Check if this thread is currently subscribed.

In subscribed message handlers, this is optimized to return true immediately
without a state lookup, since we already know we're in a subscribed context.

#### Returns

`Promise<boolean>`

Promise resolving to true if subscribed, false otherwise

### markAsRead()

```typescript
markAsRead(message?: string | Message<TRawMessage>): Promise<void>
```

Send a read receipt for an inbound message.

Defaults to the message being handled, so it takes no argument inside a
message handler. Pass a `Message` or a message ID to target one explicitly;
a `Message` must belong to this thread.

Platforms may treat the receipt as a watermark and mark earlier messages
read along with the target.

#### Parameters

<ResponseField name={"message"} type={"string | Message<TRawMessage>"}>
  **Type:** <code>{"string | "}[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

  Message or message ID to acknowledge; defaults to the current message
</ResponseField>

#### Returns

`Promise<void>`

### mentionUser()

```typescript
mentionUser(userId: string): string
```

Get a platform-specific mention string for a user.
Use this to @-mention a user in a message.

```ts
await thread.post(`Hey ${thread.mentionUser(userId)}, check this out!`);
```

#### Parameters

<ResponseField name={"userId"} type={"string"} required />

#### Returns

`string`

### post()

```typescript
post(message: T): Promise<T>
```

Post a message to this thread.

Supports text, markdown, cards, and streaming from async iterables.
When posting a stream (e.g., from AI SDK), uses adapter-native streaming
when available, or falls back to post + edit with throttling.

```typescript
// Simple string
await thread.post("Hello!");

// Markdown
await thread.post({ markdown: "**Bold** and _italic_" });

// With emoji
await thread.post(`${emoji.thumbs_up} Great job!`);

// JSX Card (with @jsxImportSource chat)
await thread.post(
  <Card title="Welcome!">
    <Text>Hello world</Text>
  </Card>
);

// Stream from AI SDK
const result = await agent.stream({ prompt: message.text });
await thread.post(result.textStream);

// Stream with options via StreamingPlan PostableObject
const stream = new StreamingPlan(result.fullStream, {
  groupTasks: "plan",
  endWith: [feedbackBlocks],
});
await thread.post(stream);

// Plan with live updates
const plan = new Plan({ initialMessage: "Working..." });
await thread.post(plan);
await plan.addTask({ title: "Step 1" });
await plan.complete({ completeMessage: "Done!" });
```

#### Parameters

<ResponseField name={"message"} type={"T"} required>
  String, PostableMessage, JSX Card, or AsyncIterable
</ResponseField>

#### Returns

`Promise<T>`

A SentMessage with methods to edit, delete, or add reactions

```typescript
post(message: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement | AsyncIterable<string | StreamChunk | StreamEvent, any, any> | PostableObject<unknown>): Promise<SentMessage<TRawMessage>>
```

Post a message.

#### Parameters

<ResponseField name={"message"} type={"string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElem…"} required>
  **Type:** <code>{"string | "}[PostableRaw](/docs/reference/stable/chat/index/interfaces/PostableRaw){" | "}[PostableMarkdown](/docs/reference/stable/chat/index/interfaces/PostableMarkdown){" | "}[PostableAst](/docs/reference/stable/chat/index/interfaces/PostableAst){" | "}[PostableCard](/docs/reference/stable/chat/index/interfaces/PostableCard){" | "}[CardElement](/docs/reference/stable/chat/index/interfaces/CardElement){" | "}[TextElement](/docs/reference/stable/chat/index/interfaces/TextElement){" | "}[ImageElement](/docs/reference/stable/chat/index/interfaces/ImageElement){" | "}[DividerElement](/docs/reference/stable/chat/index/interfaces/DividerElement){" | "}[ActionsElement](/docs/reference/stable/chat/index/interfaces/ActionsElement){" | "}[SectionElement](/docs/reference/stable/chat/index/interfaces/SectionElement){" | "}[FieldsElement](/docs/reference/stable/chat/index/interfaces/FieldsElement){" | "}[LinkElement](/docs/reference/stable/chat/index/interfaces/LinkElement){" | "}[TableElement](/docs/reference/stable/chat/index/interfaces/TableElement){" | "}[ChartElement](/docs/reference/stable/chat/index/interfaces/ChartElement){" | "}[ModalElement](/docs/reference/stable/chat/index/interfaces/ModalElement){" | "}[CardJSXElement](/docs/reference/stable/chat/index/interfaces/CardJSXElement){"<"}[CardJSXProps](/docs/reference/stable/chat/index/types/CardJSXProps){"> | "}[ButtonElement](/docs/reference/stable/chat/index/interfaces/ButtonElement){" | "}[LinkButtonElement](/docs/reference/stable/chat/index/interfaces/LinkButtonElement){" | "}[FieldElement](/docs/reference/stable/chat/index/interfaces/FieldElement){" | "}[TextInputElement](/docs/reference/stable/chat/index/interfaces/TextInputElement){" | "}[DateInputElement](/docs/reference/stable/chat/index/interfaces/DateInputElement){" | "}[NumberInputElement](/docs/reference/stable/chat/index/interfaces/NumberInputElement){" | "}[SelectElement](/docs/reference/stable/chat/index/interfaces/SelectElement){" | "}[ExternalSelectElement](/docs/reference/stable/chat/index/interfaces/ExternalSelectElement){" | "}[SelectOptionElement](/docs/reference/stable/chat/index/interfaces/SelectOptionElement){" | "}[RadioSelectElement](/docs/reference/stable/chat/index/interfaces/RadioSelectElement){" | AsyncIterable<string | "}[StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk){" | "}[StreamEvent](/docs/reference/stable/chat/index/types/StreamEvent){", any, any> | "}[PostableObject](/docs/reference/stable/chat/index/interfaces/PostableObject){"<unknown>"}</code>
</ResponseField>

#### Returns

<code>{"Promise<"}[SentMessage](/docs/reference/stable/chat/index/interfaces/SentMessage){"<TRawMessage>>"}</code>

### postEphemeral()

```typescript
postEphemeral(user: string | Author, message: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement, options: PostEphemeralOptions): Promise<EphemeralMessage<TRawMessage> | null>
```

Post an ephemeral message visible only to a specific user.

**Platform Behavior:**

* **Slack**: Native ephemeral (session-dependent, disappears on reload)
* **Google Chat**: Native private message (persists, only target user sees it)
* **Teams**: Native targeted message (public preview)
* **Discord**: No native support - requires fallbackToDM: true

```typescript
// Always send (DM fallback on Discord/Teams)
await thread.postEphemeral(user, 'Only you can see this!', { fallbackToDM: true })

// Only send if native ephemeral supported (Slack/GChat)
const result = await thread.postEphemeral(user, 'Secret!', { fallbackToDM: false })
if (!result) {
  // Platform doesn't support native ephemeral - handle accordingly
}
```

#### Parameters

<ResponseField name={"user"} type={"string | Author"} required>
  **Type:** <code>{"string | "}[Author](/docs/reference/stable/chat/index/interfaces/Author)</code>

  User ID string or Author object (from message.author or event.user)
</ResponseField>

<ResponseField name={"message"} type={"string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElem…"} required>
  **Type:** <code>{"string | "}[PostableRaw](/docs/reference/stable/chat/index/interfaces/PostableRaw){" | "}[PostableMarkdown](/docs/reference/stable/chat/index/interfaces/PostableMarkdown){" | "}[PostableAst](/docs/reference/stable/chat/index/interfaces/PostableAst){" | "}[PostableCard](/docs/reference/stable/chat/index/interfaces/PostableCard){" | "}[CardElement](/docs/reference/stable/chat/index/interfaces/CardElement){" | "}[TextElement](/docs/reference/stable/chat/index/interfaces/TextElement){" | "}[ImageElement](/docs/reference/stable/chat/index/interfaces/ImageElement){" | "}[DividerElement](/docs/reference/stable/chat/index/interfaces/DividerElement){" | "}[ActionsElement](/docs/reference/stable/chat/index/interfaces/ActionsElement){" | "}[SectionElement](/docs/reference/stable/chat/index/interfaces/SectionElement){" | "}[FieldsElement](/docs/reference/stable/chat/index/interfaces/FieldsElement){" | "}[LinkElement](/docs/reference/stable/chat/index/interfaces/LinkElement){" | "}[TableElement](/docs/reference/stable/chat/index/interfaces/TableElement){" | "}[ChartElement](/docs/reference/stable/chat/index/interfaces/ChartElement){" | "}[ModalElement](/docs/reference/stable/chat/index/interfaces/ModalElement){" | "}[CardJSXElement](/docs/reference/stable/chat/index/interfaces/CardJSXElement){"<"}[CardJSXProps](/docs/reference/stable/chat/index/types/CardJSXProps){"> | "}[ButtonElement](/docs/reference/stable/chat/index/interfaces/ButtonElement){" | "}[LinkButtonElement](/docs/reference/stable/chat/index/interfaces/LinkButtonElement){" | "}[FieldElement](/docs/reference/stable/chat/index/interfaces/FieldElement){" | "}[TextInputElement](/docs/reference/stable/chat/index/interfaces/TextInputElement){" | "}[DateInputElement](/docs/reference/stable/chat/index/interfaces/DateInputElement){" | "}[NumberInputElement](/docs/reference/stable/chat/index/interfaces/NumberInputElement){" | "}[SelectElement](/docs/reference/stable/chat/index/interfaces/SelectElement){" | "}[ExternalSelectElement](/docs/reference/stable/chat/index/interfaces/ExternalSelectElement){" | "}[SelectOptionElement](/docs/reference/stable/chat/index/interfaces/SelectOptionElement){" | "}[RadioSelectElement](/docs/reference/stable/chat/index/interfaces/RadioSelectElement)</code>

  Message content (string, markdown, card, etc.). Streaming is not supported.
</ResponseField>

<ResponseField name={"options"} type={"PostEphemeralOptions"} typeHref={"/reference/stable/chat/index/interfaces/PostEphemeralOptions"} required />

#### Returns

<code>{"Promise<"}[EphemeralMessage](/docs/reference/stable/chat/index/interfaces/EphemeralMessage){"<TRawMessage> | null>"}</code>

EphemeralMessage with `usedFallback: true` if DM was used, or null
if native ephemeral not supported and fallbackToDM is false

### refresh()

```typescript
refresh(): Promise<void>
```

Refresh `recentMessages` from the API.

Fetches the latest 50 messages and updates `recentMessages`.

#### Returns

`Promise<void>`

### reply()

```typescript
reply(target: string | Message<TRawMessage>, message: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | AsyncIterable<string | StreamChunk | StreamEvent, any, any> | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement): Promise<SentMessage<TRawMessage>>
```

Reply to a specific message in this thread, using the platform's native
reply (quote, threaded reply) rather than posting a loose message.

Throws `NotImplementedError` on adapters without native reply support.

```typescript
chat.onNewMessage(async (thread, message) => {
  await thread.reply(message, 'Got it');
});
```

#### Parameters

<ResponseField name={"target"} type={"string | Message<TRawMessage>"} required>
  **Type:** <code>{"string | "}[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

  The message to reply to, or its id. Prefer passing the
  `Message`: it is checked against this thread, and it is carried through
  to `SentMessage.replyTo` and cached thread history. A raw id is resolved
  only if it matches a message this thread already holds (`recentMessages`
  or the message being handled); otherwise the reply is still sent, but
  `replyTo` is left undefined and no cross-thread check happens.
</ResponseField>

<ResponseField name={"message"} type={"string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElem…"} required>
  **Type:** <code>{"string | "}[PostableRaw](/docs/reference/stable/chat/index/interfaces/PostableRaw){" | "}[PostableMarkdown](/docs/reference/stable/chat/index/interfaces/PostableMarkdown){" | "}[PostableAst](/docs/reference/stable/chat/index/interfaces/PostableAst){" | "}[PostableCard](/docs/reference/stable/chat/index/interfaces/PostableCard){" | "}[CardElement](/docs/reference/stable/chat/index/interfaces/CardElement){" | "}[TextElement](/docs/reference/stable/chat/index/interfaces/TextElement){" | "}[ImageElement](/docs/reference/stable/chat/index/interfaces/ImageElement){" | "}[DividerElement](/docs/reference/stable/chat/index/interfaces/DividerElement){" | "}[ActionsElement](/docs/reference/stable/chat/index/interfaces/ActionsElement){" | "}[SectionElement](/docs/reference/stable/chat/index/interfaces/SectionElement){" | "}[FieldsElement](/docs/reference/stable/chat/index/interfaces/FieldsElement){" | "}[LinkElement](/docs/reference/stable/chat/index/interfaces/LinkElement){" | "}[TableElement](/docs/reference/stable/chat/index/interfaces/TableElement){" | "}[ChartElement](/docs/reference/stable/chat/index/interfaces/ChartElement){" | AsyncIterable<string | "}[StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk){" | "}[StreamEvent](/docs/reference/stable/chat/index/types/StreamEvent){", any, any> | "}[ModalElement](/docs/reference/stable/chat/index/interfaces/ModalElement){" | "}[CardJSXElement](/docs/reference/stable/chat/index/interfaces/CardJSXElement){"<"}[CardJSXProps](/docs/reference/stable/chat/index/types/CardJSXProps){"> | "}[ButtonElement](/docs/reference/stable/chat/index/interfaces/ButtonElement){" | "}[LinkButtonElement](/docs/reference/stable/chat/index/interfaces/LinkButtonElement){" | "}[FieldElement](/docs/reference/stable/chat/index/interfaces/FieldElement){" | "}[TextInputElement](/docs/reference/stable/chat/index/interfaces/TextInputElement){" | "}[DateInputElement](/docs/reference/stable/chat/index/interfaces/DateInputElement){" | "}[NumberInputElement](/docs/reference/stable/chat/index/interfaces/NumberInputElement){" | "}[SelectElement](/docs/reference/stable/chat/index/interfaces/SelectElement){" | "}[ExternalSelectElement](/docs/reference/stable/chat/index/interfaces/ExternalSelectElement){" | "}[SelectOptionElement](/docs/reference/stable/chat/index/interfaces/SelectOptionElement){" | "}[RadioSelectElement](/docs/reference/stable/chat/index/interfaces/RadioSelectElement)</code>

  Reply content. Streams are buffered and posted as one
  message rather than streamed edit-by-edit.
</ResponseField>

#### Returns

<code>{"Promise<"}[SentMessage](/docs/reference/stable/chat/index/interfaces/SentMessage){"<TRawMessage>>"}</code>

### schedule()

```typescript
schedule(message: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement, options: { postAt: Date }): Promise<ScheduledMessage<TRawMessage>>
```

Schedule a message for future delivery.

Currently only supported by the Slack adapter. Other adapters
will throw NotImplementedError.

```typescript
const scheduled = await thread.schedule("Reminder: standup!", {
  postAt: new Date("2026-03-09T09:00:00Z"),
});

// Cancel before it's sent
await scheduled.cancel();
```

#### Parameters

<ResponseField name={"message"} type={"string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElem…"} required>
  **Type:** <code>{"string | "}[PostableRaw](/docs/reference/stable/chat/index/interfaces/PostableRaw){" | "}[PostableMarkdown](/docs/reference/stable/chat/index/interfaces/PostableMarkdown){" | "}[PostableAst](/docs/reference/stable/chat/index/interfaces/PostableAst){" | "}[PostableCard](/docs/reference/stable/chat/index/interfaces/PostableCard){" | "}[CardElement](/docs/reference/stable/chat/index/interfaces/CardElement){" | "}[TextElement](/docs/reference/stable/chat/index/interfaces/TextElement){" | "}[ImageElement](/docs/reference/stable/chat/index/interfaces/ImageElement){" | "}[DividerElement](/docs/reference/stable/chat/index/interfaces/DividerElement){" | "}[ActionsElement](/docs/reference/stable/chat/index/interfaces/ActionsElement){" | "}[SectionElement](/docs/reference/stable/chat/index/interfaces/SectionElement){" | "}[FieldsElement](/docs/reference/stable/chat/index/interfaces/FieldsElement){" | "}[LinkElement](/docs/reference/stable/chat/index/interfaces/LinkElement){" | "}[TableElement](/docs/reference/stable/chat/index/interfaces/TableElement){" | "}[ChartElement](/docs/reference/stable/chat/index/interfaces/ChartElement){" | "}[ModalElement](/docs/reference/stable/chat/index/interfaces/ModalElement){" | "}[CardJSXElement](/docs/reference/stable/chat/index/interfaces/CardJSXElement){"<"}[CardJSXProps](/docs/reference/stable/chat/index/types/CardJSXProps){"> | "}[ButtonElement](/docs/reference/stable/chat/index/interfaces/ButtonElement){" | "}[LinkButtonElement](/docs/reference/stable/chat/index/interfaces/LinkButtonElement){" | "}[FieldElement](/docs/reference/stable/chat/index/interfaces/FieldElement){" | "}[TextInputElement](/docs/reference/stable/chat/index/interfaces/TextInputElement){" | "}[DateInputElement](/docs/reference/stable/chat/index/interfaces/DateInputElement){" | "}[NumberInputElement](/docs/reference/stable/chat/index/interfaces/NumberInputElement){" | "}[SelectElement](/docs/reference/stable/chat/index/interfaces/SelectElement){" | "}[ExternalSelectElement](/docs/reference/stable/chat/index/interfaces/ExternalSelectElement){" | "}[SelectOptionElement](/docs/reference/stable/chat/index/interfaces/SelectOptionElement){" | "}[RadioSelectElement](/docs/reference/stable/chat/index/interfaces/RadioSelectElement)</code>

  The message content (streaming not supported)
</ResponseField>

<ResponseField name={"options"} type={"{ postAt: Date }"} required>
  Scheduling options including the target delivery time
</ResponseField>

#### Returns

<code>{"Promise<"}[ScheduledMessage](/docs/reference/stable/chat/index/interfaces/ScheduledMessage){"<TRawMessage>>"}</code>

A ScheduledMessage with cancel() capability

### setState()

```typescript
setState(state: Partial<TState>, options?: { replace: boolean }): Promise<void>
```

Set the state. Merges with existing state by default.

#### Parameters

<ResponseField name={"state"} type={"Partial<TState>"} required />

<ResponseField name={"options"} type={"{ replace: boolean }"} />

#### Returns

`Promise<void>`

### startTyping()

```typescript
startTyping(status?: string): Promise<void>
```

Show typing indicator in the thread.

Some platforms support persistent typing indicators, others just send once.
Optional status (e.g. "Typing...", "Searching documents...") is shown where supported.

#### Parameters

<ResponseField name={"status"} type={"string"} />

#### Returns

`Promise<void>`

### subscribe()

```typescript
subscribe(): Promise<void>
```

Subscribe to future messages in this thread.

Once subscribed, messages in non-DM threads trigger `onSubscribedMessage`
handlers. DM threads route to `onDirectMessage` first when a direct
message handler is registered.
The initial message that triggered subscription will NOT fire the handler.

```typescript
chat.onNewMention(async (thread, message) => {
  await thread.subscribe();  // Subscribe to follow-up messages
  await thread.post("I'm now watching this thread!");
});
```

#### Returns

`Promise<void>`

### toJSON()

```typescript
toJSON(): SerializedThread
```

Serialize the thread to a plain JSON object.
Use this to pass thread data to external systems like workflow engines.

#### Returns

<code>[SerializedThread](/docs/reference/stable/chat/index/interfaces/SerializedThread)</code>

### unsubscribe()

```typescript
unsubscribe(): Promise<void>
```

Unsubscribe from this thread.

Future messages will no longer trigger `onSubscribedMessage` handlers.

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.