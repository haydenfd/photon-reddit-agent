> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Message

> A chat message with serialization support for workflow engines.

```typescript
// Create a message
const message = new Message({
  id: "msg-1",
  threadId: "slack:C123:1234.5678",
  text: "Hello world",
  formatted: parseMarkdown("Hello world"),
  raw: {},
  author: { userId: "U123", userName: "user", fullName: "User", isBot: false, isMe: false },
  metadata: { dateSent: new Date(), edited: false },
  attachments: [],
});

// Serialize for workflow
const serialized = message.toJSON();
```

## Constructor

```typescript
Message(data: MessageData<TRawMessage>): Message<TRawMessage>
```

### Parameters

<ResponseField name={"data"} type={"MessageData<TRawMessage>"} required>
  **Type:** <code>[MessageData](/docs/reference/stable/chat/index/interfaces/MessageData){"<TRawMessage>"}</code>
</ResponseField>

### Returns

<code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

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

<ResponseField name={"subject"} type={"Promise<MessageSubject | null>"} required>
  **Type:** <code>{"Promise<"}[MessageSubject](/docs/reference/stable/chat/index/interfaces/MessageSubject){" | null>"}</code>
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

### [WORKFLOW\_DESERIALIZE]()

```typescript
[WORKFLOW_DESERIALIZE](data: SerializedMessage): Message
```

Deserialize a Message from @workflow/serde.
This static method is automatically called by workflow deserialization.

#### Parameters

<ResponseField name={"data"} type={"SerializedMessage"} typeHref={"/reference/stable/chat/index/interfaces/SerializedMessage"} required />

#### Returns

<code>[Message](/docs/reference/stable/chat/index/classes/Message)</code>

### [WORKFLOW\_SERIALIZE]()

```typescript
[WORKFLOW_SERIALIZE](instance: Message): SerializedMessage
```

Serialize a Message instance for @workflow/serde.
This static method is automatically called by workflow serialization.

#### Parameters

<ResponseField name={"instance"} type={"Message"} typeHref={"/reference/stable/chat/index/classes/Message"} required />

#### Returns

<code>[SerializedMessage](/docs/reference/stable/chat/index/interfaces/SerializedMessage)</code>

### fromJSON()

```typescript
fromJSON(json: SerializedMessage): Message<TRawMessage>
```

Reconstruct a Message from serialized JSON data.
Converts ISO date strings back to Date objects.

#### Parameters

<ResponseField name={"json"} type={"SerializedMessage"} typeHref={"/reference/stable/chat/index/interfaces/SerializedMessage"} required />

#### Returns

<code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

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