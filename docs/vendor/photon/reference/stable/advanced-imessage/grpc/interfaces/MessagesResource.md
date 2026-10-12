> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessagesResource

> Message APIs.

* `sendText(chat, text, options)` sends text with replies, subjects,
  effects, rich links, data-detector scanning, and formatting.
* `sendAttachment(chat, attachment, options)` sends an uploaded attachment
  by GUID with replies, effects, and audio-message mode.
* `sendMultipart(chat, parts, options)` sends multiple text / attachment /
  mention bubbles atomically.
* `sendCustomizedMiniApp(chat, message, options)` sends a mini app card
  backed by the caller's own iMessage extension and returns the session
  needed for updates.
* `updateCustomizedMiniApp(session, message, options)` updates a caller-owned
  mini app card in place.
* `edit(chat, message, newText, options)` edits an existing message.
* `unsend(chat, message, options)` retracts an existing message.
* `setReaction(chat, message, reaction, isSet, options)` adds or removes
  a tapback / emoji reaction.
* `placeSticker(chat, message, sticker, placement, options)` places an
  uploaded sticker attachment on a message.
* `notifySilenced(chat, message, options)` triggers Apple's Notify Anyway
  action for a Focus-silenced conversation.
* `get(message)` fetches one message by its guid.
* `listRecent(filter)` pages through recent messages across chats.
* `listInChat(chat, filter)` pages through messages in one chat.
* `getEmbeddedMedia(chat, message)` downloads Digital Touch / handwritten
  embedded media bytes.
* `subscribeEvents(filter)` streams live message changes.

## Methods

### edit()

```typescript
edit(chat: string, message: string, newText: string, options?: { backwardCompatText: string; clientMessageId: string; partIndex: number }): Promise<Message>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"newText"} type={"string"} required />

<ResponseField name={"options"} type={"{ backwardCompatText: string; clientMessageId: string; partIndex: number }"} />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){">"}</code>

### get()

```typescript
get(message: string): Promise<Message>
```

#### Parameters

<ResponseField name={"message"} type={"string"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){">"}</code>

### getEmbeddedMedia()

```typescript
getEmbeddedMedia(chat: string, message: string): Promise<EmbeddedMediaItem>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

#### Returns

<code>{"Promise<"}[EmbeddedMediaItem](/docs/reference/stable/advanced-imessage/grpc/interfaces/EmbeddedMediaItem){">"}</code>

### listInChat()

```typescript
listInChat(chat: string, options?: MessageListFilter): Promise<MessageListPage>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"options"} type={"MessageListFilter"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/MessageListFilter"} />

#### Returns

<code>{"Promise<"}[MessageListPage](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessageListPage){">"}</code>

### listRecent()

```typescript
listRecent(options?: MessageListFilter): Promise<MessageListPage>
```

#### Parameters

<ResponseField name={"options"} type={"MessageListFilter"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/MessageListFilter"} />

#### Returns

<code>{"Promise<"}[MessageListPage](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessageListPage){">"}</code>

### notifySilenced()

```typescript
notifySilenced(chat: string, message: string, options?: { clientMessageId: string }): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"options"} type={"{ clientMessageId: string }"} />

#### Returns

`Promise<void>`

### placeSticker()

```typescript
placeSticker(chat: string, message: string, sticker: string, placement: StickerPlacement, options?: { clientMessageId: string; partIndex: number }): Promise<Message>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"sticker"} type={"string"} required />

<ResponseField name={"placement"} type={"StickerPlacement"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/StickerPlacement"} required />

<ResponseField name={"options"} type={"{ clientMessageId: string; partIndex: number }"} />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){">"}</code>

### sendAttachment()

```typescript
sendAttachment(chat: string, attachment: string, options?: { clientMessageId: string; effect: MessageEffect; isAudioMessage: boolean; replyTo: string | { guid: string; partIndex: number } }): Promise<Message>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"attachment"} type={"string"} required />

<ResponseField name={"options"} type={"{ clientMessageId: string; effect: MessageEffect; isAudioMessage: boolean; repl…"}>
  **Type:** <code>{"{ clientMessageId: string; effect: "}[MessageEffect](/docs/reference/stable/advanced-imessage/grpc/types/MessageEffect){"; isAudioMessage: boolean; replyTo: string | { guid: string; partIndex: number } }"}</code>
</ResponseField>

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){">"}</code>

### sendCustomizedMiniApp()

```typescript
sendCustomizedMiniApp(chat: string, message: CustomizedMiniAppMessage, options?: IdempotencyOptions): Promise<MiniAppMessageResult>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"message"} type={"CustomizedMiniAppMessage"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/CustomizedMiniAppMessage"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

<code>{"Promise<"}[MiniAppMessageResult](/docs/reference/stable/advanced-imessage/grpc/types/MiniAppMessageResult){">"}</code>

### sendMultipart()

```typescript
sendMultipart(chat: string, parts: readonly MessagePart[], options?: { clientMessageId: string; effect: MessageEffect; enableDataDetection: boolean; replyTo: string | { guid: string; partIndex: number }; subject: string }): Promise<Message>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"parts"} type={"readonly MessagePart[]"} required>
  **Type:** <code>{"readonly "}[MessagePart](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessagePart){"[]"}</code>
</ResponseField>

<ResponseField name={"options"} type={"{ clientMessageId: string; effect: MessageEffect; enableDataDetection: boolean;…"}>
  **Type:** <code>{"{ clientMessageId: string; effect: "}[MessageEffect](/docs/reference/stable/advanced-imessage/grpc/types/MessageEffect){"; enableDataDetection: boolean; replyTo: string | { guid: string; partIndex: number }; subject: string }"}</code>
</ResponseField>

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){">"}</code>

### sendText()

```typescript
sendText(chat: string, text: string, options?: SendOptions): Promise<Message>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"text"} type={"string"} required />

<ResponseField name={"options"} type={"SendOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/SendOptions"} />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){">"}</code>

### setReaction()

```typescript
setReaction(chat: string, message: string, reaction: SettableMessageReaction, isSet: boolean, options?: { clientMessageId: string; partIndex: number }): Promise<Message>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"reaction"} type={"SettableMessageReaction"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/SettableMessageReaction"} required />

<ResponseField name={"isSet"} type={"boolean"} required />

<ResponseField name={"options"} type={"{ clientMessageId: string; partIndex: number }"} />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){">"}</code>

### subscribeEvents()

```typescript
subscribeEvents(filter?: { chat: string }): TypedEventStream<MessageEvent>
```

#### Parameters

<ResponseField name={"filter"} type={"{ chat: string }"} />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/advanced-imessage/grpc/classes/TypedEventStream){"<"}[MessageEvent](/docs/reference/stable/advanced-imessage/grpc/types/MessageEvent){">"}</code>

### unsend()

```typescript
unsend(chat: string, message: string, options?: { clientMessageId: string; partIndex: number }): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"options"} type={"{ clientMessageId: string; partIndex: number }"} />

#### Returns

`Promise<void>`

### updateCustomizedMiniApp()

```typescript
updateCustomizedMiniApp(session: MiniAppCardSession, message: CustomizedMiniAppMessage, options?: IdempotencyOptions): Promise<MiniAppMessageResult>
```

#### Parameters

<ResponseField name={"session"} type={"MiniAppCardSession"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/MiniAppCardSession"} required />

<ResponseField name={"message"} type={"CustomizedMiniAppMessage"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/CustomizedMiniAppMessage"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

<code>{"Promise<"}[MiniAppMessageResult](/docs/reference/stable/advanced-imessage/grpc/types/MiniAppMessageResult){">"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.