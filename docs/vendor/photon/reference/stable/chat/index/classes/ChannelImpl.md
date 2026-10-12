> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChannelImpl

> Represents a channel/conversation container that holds threads.

Represents a channel/conversation container that holds threads.
Extends Postable for message posting capabilities.

```typescript
class ChannelImpl implements Channel<TState>
```

## Constructor

```typescript
ChannelImpl(config: ChannelImplConfig): ChannelImpl<TState>
```

### Parameters

<ResponseField name={"config"} type={"ChannelImplConfig"} required />

### Returns

<code>[ChannelImpl](/docs/reference/stable/chat/index/classes/ChannelImpl){"<TState>"}</code>

## Properties

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required>
  The adapter this entity belongs to
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

<ResponseField name={"messages"} type={"AsyncIterable<Message<unknown>>"} required>
  **Type:** <code>{"AsyncIterable<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>"}</code>

  Iterate messages newest first (backward from most recent).
  Auto-paginates lazily — only fetches pages as consumed.
</ResponseField>

<ResponseField name={"name"} type={"string | null"} required>
  Channel name (e.g., "#general"). Null until fetchInfo() is called.
</ResponseField>

<ResponseField name={"state"} type={"Promise<TState | null>"} required>
  Get the current state.
  Returns null if no state has been set.
</ResponseField>

## Methods

### [WORKFLOW\_DESERIALIZE]()

```typescript
[WORKFLOW_DESERIALIZE](data: SerializedChannel): ChannelImpl
```

#### Parameters

<ResponseField name={"data"} type={"SerializedChannel"} typeHref={"/reference/stable/chat/index/interfaces/SerializedChannel"} required />

#### Returns

<code>[ChannelImpl](/docs/reference/stable/chat/index/classes/ChannelImpl)</code>

### [WORKFLOW\_SERIALIZE]()

```typescript
[WORKFLOW_SERIALIZE](instance: ChannelImpl): SerializedChannel
```

#### Parameters

<ResponseField name={"instance"} type={"ChannelImpl"} typeHref={"/reference/stable/chat/index/classes/ChannelImpl"} required />

#### Returns

<code>[SerializedChannel](/docs/reference/stable/chat/index/interfaces/SerializedChannel)</code>

### fetchMetadata()

```typescript
fetchMetadata(): Promise<ChannelInfo>
```

Fetch channel metadata from the platform

#### Returns

<code>{"Promise<"}[ChannelInfo](/docs/reference/stable/chat/index/interfaces/ChannelInfo){">"}</code>

### fromJSON()

```typescript
fromJSON(json: SerializedChannel, adapter?: Adapter<unknown, unknown>, chat?: ChatSingleton): ChannelImpl<TState>
```

#### Parameters

<ResponseField name={"json"} type={"SerializedChannel"} typeHref={"/reference/stable/chat/index/interfaces/SerializedChannel"} required />

<ResponseField name={"adapter"} type={"Adapter<unknown, unknown>"}>
  **Type:** <code>[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"<unknown, unknown>"}</code>
</ResponseField>

<ResponseField name={"chat"} type={"ChatSingleton"} />

#### Returns

<code>[ChannelImpl](/docs/reference/stable/chat/index/classes/ChannelImpl){"<TState>"}</code>

### mentionUser()

```typescript
mentionUser(userId: string): string
```

Get a platform-specific mention string for a user.

#### Parameters

<ResponseField name={"userId"} type={"string"} required />

#### Returns

`string`

### post()

```typescript
post(message: T): Promise<T>
```

Post a message.

#### Parameters

<ResponseField name={"message"} type={"T"} required />

#### Returns

`Promise<T>`

```typescript
post(message: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement | AsyncIterable<string, any, any>): Promise<SentMessage<unknown>>
```

#### Parameters

<ResponseField name={"message"} type={"string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElem…"} required>
  **Type:** <code>{"string | "}[PostableRaw](/docs/reference/stable/chat/index/interfaces/PostableRaw){" | "}[PostableMarkdown](/docs/reference/stable/chat/index/interfaces/PostableMarkdown){" | "}[PostableAst](/docs/reference/stable/chat/index/interfaces/PostableAst){" | "}[PostableCard](/docs/reference/stable/chat/index/interfaces/PostableCard){" | "}[CardElement](/docs/reference/stable/chat/index/interfaces/CardElement){" | "}[TextElement](/docs/reference/stable/chat/index/interfaces/TextElement){" | "}[ImageElement](/docs/reference/stable/chat/index/interfaces/ImageElement){" | "}[DividerElement](/docs/reference/stable/chat/index/interfaces/DividerElement){" | "}[ActionsElement](/docs/reference/stable/chat/index/interfaces/ActionsElement){" | "}[SectionElement](/docs/reference/stable/chat/index/interfaces/SectionElement){" | "}[FieldsElement](/docs/reference/stable/chat/index/interfaces/FieldsElement){" | "}[LinkElement](/docs/reference/stable/chat/index/interfaces/LinkElement){" | "}[TableElement](/docs/reference/stable/chat/index/interfaces/TableElement){" | "}[ChartElement](/docs/reference/stable/chat/index/interfaces/ChartElement){" | "}[ModalElement](/docs/reference/stable/chat/index/interfaces/ModalElement){" | "}[CardJSXElement](/docs/reference/stable/chat/index/interfaces/CardJSXElement){"<"}[CardJSXProps](/docs/reference/stable/chat/index/types/CardJSXProps){"> | "}[ButtonElement](/docs/reference/stable/chat/index/interfaces/ButtonElement){" | "}[LinkButtonElement](/docs/reference/stable/chat/index/interfaces/LinkButtonElement){" | "}[FieldElement](/docs/reference/stable/chat/index/interfaces/FieldElement){" | "}[TextInputElement](/docs/reference/stable/chat/index/interfaces/TextInputElement){" | "}[DateInputElement](/docs/reference/stable/chat/index/interfaces/DateInputElement){" | "}[NumberInputElement](/docs/reference/stable/chat/index/interfaces/NumberInputElement){" | "}[SelectElement](/docs/reference/stable/chat/index/interfaces/SelectElement){" | "}[ExternalSelectElement](/docs/reference/stable/chat/index/interfaces/ExternalSelectElement){" | "}[SelectOptionElement](/docs/reference/stable/chat/index/interfaces/SelectOptionElement){" | "}[RadioSelectElement](/docs/reference/stable/chat/index/interfaces/RadioSelectElement){" | AsyncIterable<string, any, any>"}</code>
</ResponseField>

#### Returns

<code>{"Promise<"}[SentMessage](/docs/reference/stable/chat/index/interfaces/SentMessage){"<unknown>>"}</code>

### postEphemeral()

```typescript
postEphemeral(user: string | Author, message: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement, options: PostEphemeralOptions): Promise<EphemeralMessage<unknown> | null>
```

Post an ephemeral message visible only to a specific user.

#### Parameters

<ResponseField name={"user"} type={"string | Author"} required>
  **Type:** <code>{"string | "}[Author](/docs/reference/stable/chat/index/interfaces/Author)</code>
</ResponseField>

<ResponseField name={"message"} type={"string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElem…"} required>
  **Type:** <code>{"string | "}[PostableRaw](/docs/reference/stable/chat/index/interfaces/PostableRaw){" | "}[PostableMarkdown](/docs/reference/stable/chat/index/interfaces/PostableMarkdown){" | "}[PostableAst](/docs/reference/stable/chat/index/interfaces/PostableAst){" | "}[PostableCard](/docs/reference/stable/chat/index/interfaces/PostableCard){" | "}[CardElement](/docs/reference/stable/chat/index/interfaces/CardElement){" | "}[TextElement](/docs/reference/stable/chat/index/interfaces/TextElement){" | "}[ImageElement](/docs/reference/stable/chat/index/interfaces/ImageElement){" | "}[DividerElement](/docs/reference/stable/chat/index/interfaces/DividerElement){" | "}[ActionsElement](/docs/reference/stable/chat/index/interfaces/ActionsElement){" | "}[SectionElement](/docs/reference/stable/chat/index/interfaces/SectionElement){" | "}[FieldsElement](/docs/reference/stable/chat/index/interfaces/FieldsElement){" | "}[LinkElement](/docs/reference/stable/chat/index/interfaces/LinkElement){" | "}[TableElement](/docs/reference/stable/chat/index/interfaces/TableElement){" | "}[ChartElement](/docs/reference/stable/chat/index/interfaces/ChartElement){" | "}[ModalElement](/docs/reference/stable/chat/index/interfaces/ModalElement){" | "}[CardJSXElement](/docs/reference/stable/chat/index/interfaces/CardJSXElement){"<"}[CardJSXProps](/docs/reference/stable/chat/index/types/CardJSXProps){"> | "}[ButtonElement](/docs/reference/stable/chat/index/interfaces/ButtonElement){" | "}[LinkButtonElement](/docs/reference/stable/chat/index/interfaces/LinkButtonElement){" | "}[FieldElement](/docs/reference/stable/chat/index/interfaces/FieldElement){" | "}[TextInputElement](/docs/reference/stable/chat/index/interfaces/TextInputElement){" | "}[DateInputElement](/docs/reference/stable/chat/index/interfaces/DateInputElement){" | "}[NumberInputElement](/docs/reference/stable/chat/index/interfaces/NumberInputElement){" | "}[SelectElement](/docs/reference/stable/chat/index/interfaces/SelectElement){" | "}[ExternalSelectElement](/docs/reference/stable/chat/index/interfaces/ExternalSelectElement){" | "}[SelectOptionElement](/docs/reference/stable/chat/index/interfaces/SelectOptionElement){" | "}[RadioSelectElement](/docs/reference/stable/chat/index/interfaces/RadioSelectElement)</code>
</ResponseField>

<ResponseField name={"options"} type={"PostEphemeralOptions"} typeHref={"/reference/stable/chat/index/interfaces/PostEphemeralOptions"} required />

#### Returns

<code>{"Promise<"}[EphemeralMessage](/docs/reference/stable/chat/index/interfaces/EphemeralMessage){"<unknown> | null>"}</code>

### schedule()

```typescript
schedule(message: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement, options: { postAt: Date }): Promise<ScheduledMessage<unknown>>
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

<code>{"Promise<"}[ScheduledMessage](/docs/reference/stable/chat/index/interfaces/ScheduledMessage){"<unknown>>"}</code>

A ScheduledMessage with cancel() capability

### setState()

```typescript
setState(newState: Partial<TState>, options?: { replace: boolean }): Promise<void>
```

Set the state. Merges with existing state by default.

#### Parameters

<ResponseField name={"newState"} type={"Partial<TState>"} required />

<ResponseField name={"options"} type={"{ replace: boolean }"} />

#### Returns

`Promise<void>`

### startTyping()

```typescript
startTyping(status?: string): Promise<void>
```

Show typing indicator

#### Parameters

<ResponseField name={"status"} type={"string"} />

#### Returns

`Promise<void>`

### threads()

```typescript
threads(): AsyncIterable<ThreadSummary<unknown>>
```

Iterate threads in this channel, most recently active first.

#### Returns

<code>{"AsyncIterable<"}[ThreadSummary](/docs/reference/stable/chat/index/interfaces/ThreadSummary){"<unknown>>"}</code>

### toJSON()

```typescript
toJSON(): SerializedChannel
```

Serialize the channel to a plain JSON object.
Use this to pass channel data to external systems like workflow engines.

#### Returns

<code>[SerializedChannel](/docs/reference/stable/chat/index/interfaces/SerializedChannel)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.