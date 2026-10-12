> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# SentMessage

```typescript
interface SentMessage extends Omit<Message<TRawMessage>, "subject">
```

## Properties

<ResponseField name={"attachments"} type={"Attachment[]"} required>
  **Type:** <code>[Attachment](/docs/reference/stable/chat/index/interfaces/Attachment){"[]"}</code>

  Attachments
</ResponseField>

<ResponseField name={"author"} type={"Author"} typeHref={"/reference/stable/chat/index/interfaces/Author"} required>
  Message author
</ResponseField>

<ResponseField name={"formatted"} type={"Root"} typeHref={"/reference/stable/chat/index/interfaces/Root"} required>
  Structured formatting as an AST (mdast Root).
  This is the canonical representation - use this for processing.
  Use `stringifyMarkdown(message.formatted)` to get markdown string.
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Unique message ID
</ResponseField>

<ResponseField name={"isMention"} type={"boolean"}>
  Whether the bot is @-mentioned in this message.

  Populated by the Chat SDK before handlers run. An adapter that reads the
  platform's own mention metadata reports `true` or `false`; the SDK falls
  back to matching `@username` in the message text (using the adapter's
  configured `userName` and optional `botUserId`) only when this is
  `undefined`.

  A definitive `false` wins over text that merely looks like a mention, such
  as `@username` inside a code sample or quoted text.

  One exception: a direct message received while no `onDirectMessage`
  handler is registered is always marked `true`, whatever the adapter
  reported, so it routes to `onNewMention`.

  ```typescript
  chat.onSubscribedMessage(async (thread, message) => {
    if (message.isMention) {
      await thread.post("You mentioned me!");
    }
  });
  ```
</ResponseField>

<ResponseField name={"links"} type={"LinkPreview[]"} required>
  **Type:** <code>[LinkPreview](/docs/reference/stable/chat/index/interfaces/LinkPreview){"[]"}</code>

  Links found in the message
</ResponseField>

<ResponseField name={"metadata"} type={"MessageMetadata"} typeHref={"/reference/stable/chat/index/interfaces/MessageMetadata"} required>
  Message metadata
</ResponseField>

<ResponseField name={"raw"} type={"TRawMessage"} required>
  Platform-specific raw payload (escape hatch)
</ResponseField>

<ResponseField name={"replyTo"} type={"Message<TRawMessage>"}>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

  Message this message replies to
</ResponseField>

<ResponseField name={"text"} type={"string"} required>
  Plain text content (all formatting stripped)
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required>
  Thread this message belongs to
</ResponseField>

<ResponseField name={"userKey"} type={"string"}>
  Cross-platform user key for this message's author.

  Set by the Chat SDK before passing the message to handlers, when
  `ChatConfig.identity` is configured. `undefined` if no resolver is
  configured; `undefined` (i.e. absent) when the resolver returned null.

  Used by the Transcripts API to look up / append per-user transcripts.
</ResponseField>

## Methods

### addReaction()

```typescript
addReaction(emoji: string | EmojiValue): Promise<void>
```

Add a reaction to this message

#### Parameters

<ResponseField name={"emoji"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`Promise<void>`

### delete()

```typescript
delete(): Promise<void>
```

Delete this message

#### Returns

`Promise<void>`

### edit()

```typescript
edit(newContent: string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElement | TextElement | ImageElement | DividerElement | ActionsElement | SectionElement | FieldsElement | LinkElement | TableElement | ChartElement | ModalElement | CardJSXElement<CardJSXProps> | ButtonElement | LinkButtonElement | FieldElement | TextInputElement | DateInputElement | NumberInputElement | SelectElement | ExternalSelectElement | SelectOptionElement | RadioSelectElement | AsyncIterable<string | StreamChunk | StreamEvent, any, any> | PostableObject<unknown>): Promise<SentMessage<TRawMessage>>
```

Edit this message with text, a PostableMessage, or a JSX Card element

#### Parameters

<ResponseField name={"newContent"} type={"string | PostableRaw | PostableMarkdown | PostableAst | PostableCard | CardElem…"} required>
  **Type:** <code>{"string | "}[PostableRaw](/docs/reference/stable/chat/index/interfaces/PostableRaw){" | "}[PostableMarkdown](/docs/reference/stable/chat/index/interfaces/PostableMarkdown){" | "}[PostableAst](/docs/reference/stable/chat/index/interfaces/PostableAst){" | "}[PostableCard](/docs/reference/stable/chat/index/interfaces/PostableCard){" | "}[CardElement](/docs/reference/stable/chat/index/interfaces/CardElement){" | "}[TextElement](/docs/reference/stable/chat/index/interfaces/TextElement){" | "}[ImageElement](/docs/reference/stable/chat/index/interfaces/ImageElement){" | "}[DividerElement](/docs/reference/stable/chat/index/interfaces/DividerElement){" | "}[ActionsElement](/docs/reference/stable/chat/index/interfaces/ActionsElement){" | "}[SectionElement](/docs/reference/stable/chat/index/interfaces/SectionElement){" | "}[FieldsElement](/docs/reference/stable/chat/index/interfaces/FieldsElement){" | "}[LinkElement](/docs/reference/stable/chat/index/interfaces/LinkElement){" | "}[TableElement](/docs/reference/stable/chat/index/interfaces/TableElement){" | "}[ChartElement](/docs/reference/stable/chat/index/interfaces/ChartElement){" | "}[ModalElement](/docs/reference/stable/chat/index/interfaces/ModalElement){" | "}[CardJSXElement](/docs/reference/stable/chat/index/interfaces/CardJSXElement){"<"}[CardJSXProps](/docs/reference/stable/chat/index/types/CardJSXProps){"> | "}[ButtonElement](/docs/reference/stable/chat/index/interfaces/ButtonElement){" | "}[LinkButtonElement](/docs/reference/stable/chat/index/interfaces/LinkButtonElement){" | "}[FieldElement](/docs/reference/stable/chat/index/interfaces/FieldElement){" | "}[TextInputElement](/docs/reference/stable/chat/index/interfaces/TextInputElement){" | "}[DateInputElement](/docs/reference/stable/chat/index/interfaces/DateInputElement){" | "}[NumberInputElement](/docs/reference/stable/chat/index/interfaces/NumberInputElement){" | "}[SelectElement](/docs/reference/stable/chat/index/interfaces/SelectElement){" | "}[ExternalSelectElement](/docs/reference/stable/chat/index/interfaces/ExternalSelectElement){" | "}[SelectOptionElement](/docs/reference/stable/chat/index/interfaces/SelectOptionElement){" | "}[RadioSelectElement](/docs/reference/stable/chat/index/interfaces/RadioSelectElement){" | AsyncIterable<string | "}[StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk){" | "}[StreamEvent](/docs/reference/stable/chat/index/types/StreamEvent){", any, any> | "}[PostableObject](/docs/reference/stable/chat/index/interfaces/PostableObject){"<unknown>"}</code>
</ResponseField>

#### Returns

<code>{"Promise<"}[SentMessage](/docs/reference/stable/chat/index/interfaces/SentMessage){"<TRawMessage>>"}</code>

### removeReaction()

```typescript
removeReaction(emoji: string | EmojiValue): Promise<void>
```

Remove a reaction from this message

#### Parameters

<ResponseField name={"emoji"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`Promise<void>`

### toJSON()

```typescript
toJSON(): SerializedMessage
```

Serialize the message to a plain JSON object.
Use this to pass message data to external systems like workflow engines.

Note: Attachment `data` (Buffer) and `fetchData` (function) are omitted
as they're not serializable.

#### Returns

<code>[SerializedMessage](/docs/reference/stable/chat/index/interfaces/SerializedMessage)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.