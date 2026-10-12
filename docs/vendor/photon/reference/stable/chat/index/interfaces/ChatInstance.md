> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChatInstance

> Internal interface for Chat instance passed to adapters

## Properties

<ResponseField name={"history"} type={"HistoryApi"} typeHref={"/reference/stable/chat/index/interfaces/HistoryApi"} required>
  Unified History API. Sub-APIs:

  * `history.user`    — cross-platform per-user transcript store (throws if not configured)
  * `history.thread`  — per-thread message listing
  * `history.channel` — channel-level messages and thread listings
</ResponseField>

<ResponseField name={"transcripts"} type={"TranscriptsApi"} typeHref={"/reference/stable/chat/index/interfaces/TranscriptsApi"} required>
  Cross-platform per-user transcript store. Deprecated alias for
  `ChatInstance.history`.user — throws on access when user history
  was not configured (`history.user` or legacy `transcripts` + `identity`).

  <Warning>Deprecated: Use `ChatInstance.history`.user instead.</Warning>
</ResponseField>

## Methods

### abortTurn()

```typescript
abortTurn(threadId: string): Promise<void>
```

Abort active work for a conversation, including work running in another
process that shares the configured state adapter.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<void>`

### getLogger()

```typescript
getLogger(prefix?: string): Logger
```

Get the configured logger, optionally with a child prefix

#### Parameters

<ResponseField name={"prefix"} type={"string"} />

#### Returns

<code>[Logger](/docs/reference/stable/chat/index/interfaces/Logger)</code>

### getState()

```typescript
getState(): StateAdapter
```

#### Returns

<code>[StateAdapter](/docs/reference/stable/chat/index/interfaces/StateAdapter)</code>

### getUserName()

```typescript
getUserName(): string
```

#### Returns

`string`

### handleIncomingMessage()

```typescript
handleIncomingMessage(adapter: Adapter, threadId: string, message: Message): Promise<void>
```

#### Parameters

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required />

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"message"} type={"Message"} typeHref={"/reference/stable/chat/index/classes/Message"} required />

#### Returns

`Promise<void>`

### processAction()

```typescript
processAction(event: Omit<ActionEvent<unknown>, "thread" | "openModal"> & { adapter: Adapter }, options: WebhookOptions | undefined): Promise<void>
```

Process an incoming action event (button click) from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<ActionEvent<unknown>, \"thread\" | \"openModal\"> & { adapter: Adapter }"} required>
  **Type:** <code>{"Omit<"}[ActionEvent](/docs/reference/stable/chat/index/interfaces/ActionEvent){"<unknown>, \"thread\" | \"openModal\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){" }"}</code>

  The action event (without thread field, will be added)
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions | undefined"} required>
  **Type:** <code>[WebhookOptions](/docs/reference/stable/chat/index/interfaces/WebhookOptions){" | undefined"}</code>

  Webhook options including waitUntil
</ResponseField>

#### Returns

`Promise<void>`

### processAgentSessionStopped()

```typescript
processAgentSessionStopped(event: AgentSessionStoppedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AgentSessionStoppedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AgentSessionStoppedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAgentSessionTitleChanged()

```typescript
processAgentSessionTitleChanged(event: AgentSessionTitleChangedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AgentSessionTitleChangedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AgentSessionTitleChangedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAppContextChanged()

```typescript
processAppContextChanged(event: AppContextChangedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AppContextChangedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AppContextChangedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAppHomeOpened()

```typescript
processAppHomeOpened(event: AppHomeOpenedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AppHomeOpenedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AppHomeOpenedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAssistantContextChanged()

```typescript
processAssistantContextChanged(event: AssistantContextChangedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AssistantContextChangedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AssistantContextChangedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAssistantThreadStarted()

```typescript
processAssistantThreadStarted(event: AssistantThreadStartedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AssistantThreadStartedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AssistantThreadStartedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processInstalled()

```typescript
processInstalled(event: InstalledEvent, options?: WebhookOptions): void
```

Optional so custom ChatInstance implementations predating it keep compiling.

#### Parameters

<ResponseField name={"event"} type={"InstalledEvent"} typeHref={"/reference/stable/chat/index/interfaces/InstalledEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processMemberJoinedChannel()

```typescript
processMemberJoinedChannel(event: MemberJoinedChannelEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"MemberJoinedChannelEvent"} typeHref={"/reference/stable/chat/index/interfaces/MemberJoinedChannelEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processMessage()

```typescript
processMessage(adapter: Adapter, threadId: string, message: Message<unknown> | () => Promise<Message<unknown>>, options?: WebhookOptions): Promise<void>
```

Process an incoming message from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required>
  The adapter that received the message
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required>
  The thread ID
</ResponseField>

<ResponseField name={"message"} type={"Message<unknown> | () => Promise<Message<unknown>>"} required>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown> | () => Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>"}</code>

  Either a parsed message, or a factory function for lazy async parsing
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options including waitUntil
</ResponseField>

#### Returns

`Promise<void>`

### processMessageDeleted()

```typescript
processMessageDeleted(event: Omit<MessageDeletedEvent<unknown>, "platform" | "adapter"> & { adapter: Adapter; platform: string }, options?: WebhookOptions): Promise<void>
```

Process an incoming message delete from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<MessageDeletedEvent<unknown>, \"platform\" | \"adapter\"> & { adapter: Adapter…"} required>
  **Type:** <code>{"Omit<"}[MessageDeletedEvent](/docs/reference/stable/chat/index/interfaces/MessageDeletedEvent){"<unknown>, \"platform\" | \"adapter\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"; platform: string }"}</code>

  The normalized delete event
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options including waitUntil
</ResponseField>

#### Returns

`Promise<void>`

### processMessageUpdated()

```typescript
processMessageUpdated(event: { adapter: Adapter; message: Message<unknown> | () => Promise<Message<unknown>>; previousMessage: Message<unknown> | () => Promise<Message<unknown>>; threadId: string }, options?: WebhookOptions): Promise<void>
```

Process an incoming message update from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"{ adapter: Adapter; message: Message<unknown> | () => Promise<Message<unknown>>…"} required>
  **Type:** <code>{"{ adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"; message: "}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown> | () => Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>; previousMessage: "}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown> | () => Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>; threadId: string }"}</code>
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options including waitUntil
</ResponseField>

#### Returns

`Promise<void>`

### processModalClose()

```typescript
processModalClose(event: Omit<ModalCloseEvent, "relatedThread" | "relatedMessage" | "relatedChannel">, contextId?: string, options?: WebhookOptions): void
```

Process a modal close event from an adapter.

#### Parameters

<ResponseField name={"event"} type={"Omit<ModalCloseEvent, \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"} required>
  **Type:** <code>{"Omit<"}[ModalCloseEvent](/docs/reference/stable/chat/index/interfaces/ModalCloseEvent){", \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"}</code>

  The modal close event (without relatedThread/relatedMessage/relatedChannel)
</ResponseField>

<ResponseField name={"contextId"} type={"string"}>
  Context ID for retrieving stored thread/message/channel context
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options
</ResponseField>

### processModalSubmit()

```typescript
processModalSubmit(event: Omit<ModalSubmitEvent, "relatedThread" | "relatedMessage" | "relatedChannel">, contextId?: string, options?: WebhookOptions): Promise<ModalResponse | undefined>
```

Process a modal submit event from an adapter.

#### Parameters

<ResponseField name={"event"} type={"Omit<ModalSubmitEvent, \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"} required>
  **Type:** <code>{"Omit<"}[ModalSubmitEvent](/docs/reference/stable/chat/index/interfaces/ModalSubmitEvent){", \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"}</code>

  The modal submit event (without relatedThread/relatedMessage/relatedChannel)
</ResponseField>

<ResponseField name={"contextId"} type={"string"}>
  Context ID for retrieving stored thread/message/channel context
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options
</ResponseField>

#### Returns

<code>{"Promise<"}[ModalResponse](/docs/reference/stable/chat/index/types/ModalResponse){" | undefined>"}</code>

### processOptionsLoad()

```typescript
processOptionsLoad(event: OptionsLoadEvent, options?: WebhookOptions): Promise<OptionsLoadResult | undefined>
```

Process an interactive options load event from an adapter.
Returns normalized select options for the adapter to render.

#### Parameters

<ResponseField name={"event"} type={"OptionsLoadEvent"} typeHref={"/reference/stable/chat/index/interfaces/OptionsLoadEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

#### Returns

<code>{"Promise<"}[OptionsLoadResult](/docs/reference/stable/chat/index/types/OptionsLoadResult){" | undefined>"}</code>

### processReaction()

```typescript
processReaction(event: Omit<ReactionEvent<unknown>, "thread" | "adapter"> & { adapter: Adapter<unknown, unknown> }, options?: WebhookOptions): void | Promise<void>
```

Process an incoming reaction event from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<ReactionEvent<unknown>, \"thread\" | \"adapter\"> & { adapter: Adapter<unknown…"} required>
  **Type:** <code>{"Omit<"}[ReactionEvent](/docs/reference/stable/chat/index/interfaces/ReactionEvent){"<unknown>, \"thread\" | \"adapter\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"<unknown, unknown> }"}</code>

  The reaction event (without adapter field, will be added)
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options including waitUntil
</ResponseField>

#### Returns

`void | Promise<void>`

### processSlashCommand()

```typescript
processSlashCommand(event: Omit<SlashCommandEvent<Record<string, unknown>>, "channel" | "openModal"> & { adapter: Adapter; channelId: string }, options: WebhookOptions | undefined): void | Promise<void>
```

Process an incoming slash command from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<SlashCommandEvent<Record<string, unknown>>, \"channel\" | \"openModal\"> & { a…"} required>
  **Type:** <code>{"Omit<"}[SlashCommandEvent](/docs/reference/stable/chat/index/interfaces/SlashCommandEvent){"<Record<string, unknown>>, \"channel\" | \"openModal\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"; channelId: string }"}</code>

  The slash command event
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions | undefined"} required>
  **Type:** <code>[WebhookOptions](/docs/reference/stable/chat/index/interfaces/WebhookOptions){" | undefined"}</code>

  Webhook options including waitUntil
</ResponseField>

#### Returns

`void | Promise<void>`

### processUninstalled()

```typescript
processUninstalled(event: UninstalledEvent, options?: WebhookOptions): void
```

Optional so custom ChatInstance implementations predating it keep compiling.

#### Parameters

<ResponseField name={"event"} type={"UninstalledEvent"} typeHref={"/reference/stable/chat/index/interfaces/UninstalledEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.