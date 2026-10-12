> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageChain

> Message Processing Chain Note: You must explicitly call execute() to perform operations

Message Processing Chain

Note: You must explicitly call execute() to perform operations

```ts
await sdk.message(msg)
  .ifFromOthers()
  .matchText('hello')
  .replyText('Hi!')
  .execute()  // Must call execute()
```

## Constructor

```typescript
MessageChain(message: Message, sender: MessageSender): MessageChain
```

### Parameters

<ResponseField name={"message"} type={"Message"} typeHref={"/reference/stable/imessage-kit/interfaces/Message"} required>
  Message
</ResponseField>

<ResponseField name={"sender"} type={"MessageSender"} required>
  Sender
</ResponseField>

### Returns

<code>[MessageChain](/docs/reference/stable/imessage-kit/classes/MessageChain)</code>

## Methods

### do()

```typescript
do(handler: (message: Message) => void | Promise<void>): this
```

Execute custom operation

#### Parameters

<ResponseField name={"handler"} type={"(message: Message) => void | Promise<void>"} required>
  **Type:** <code>{"(message: "}[Message](/docs/reference/stable/imessage-kit/interfaces/Message){") => void | Promise<void>"}</code>
</ResponseField>

#### Returns

`this`

### execute()

```typescript
execute(): Promise<void>
```

Execute all operations (explicit call)

This is the only method that actually performs operations

#### Returns

`Promise<void>`

### ifFromMe()

```typescript
ifFromMe(): this
```

Only process my own messages

#### Returns

`this`

### ifFromOthers()

```typescript
ifFromOthers(): this
```

Only process messages from others

#### Returns

`this`

### ifGroupChat()

```typescript
ifGroupChat(): this
```

Only process group chat messages

#### Returns

`this`

### ifNotReaction()

```typescript
ifNotReaction(): this
```

Only process non-reaction messages (skip tapbacks)

#### Returns

`this`

### ifReaction()

```typescript
ifReaction(): this
```

Only process tapback reactions

#### Returns

`this`

### ifUnread()

```typescript
ifUnread(): this
```

Only process unread messages

#### Returns

`this`

### matchText()

```typescript
matchText(pattern: string | RegExp): this
```

Match text pattern

#### Parameters

<ResponseField name={"pattern"} type={"string | RegExp"} required />

#### Returns

`this`

### replyImage()

```typescript
replyImage(images: string | string[] | Mapper<Message, string | string[]>): this
```

Reply with image

Automatically routes to recipient or group based on message.chatId

#### Parameters

<ResponseField name={"images"} type={"string | string[] | Mapper<Message, string | string[]>"} required>
  **Type:** <code>{"string | string[] | "}[Mapper](/docs/reference/stable/imessage-kit/types/Mapper){"<"}[Message](/docs/reference/stable/imessage-kit/interfaces/Message){", string | string[]>"}</code>
</ResponseField>

#### Returns

`this`

### replyText()

```typescript
replyText(text: string | Mapper<Message, string>): this
```

Reply with text

Automatically routes to recipient or group based on message.chatId

#### Parameters

<ResponseField name={"text"} type={"string | Mapper<Message, string>"} required>
  **Type:** <code>{"string | "}[Mapper](/docs/reference/stable/imessage-kit/types/Mapper){"<"}[Message](/docs/reference/stable/imessage-kit/interfaces/Message){", string>"}</code>
</ResponseField>

#### Returns

`this`

### when()

```typescript
when(predicate: Predicate<Message>): this
```

Conditional check

#### Parameters

<ResponseField name={"predicate"} type={"Predicate<Message>"} required>
  **Type:** <code>[Predicate](/docs/reference/stable/imessage-kit/types/Predicate){"<"}[Message](/docs/reference/stable/imessage-kit/interfaces/Message){">"}</code>
</ResponseField>

#### Returns

`this`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.