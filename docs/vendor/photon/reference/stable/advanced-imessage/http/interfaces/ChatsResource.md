> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChatsResource

> Chat APIs.

* `create(addresses, options)` creates a direct or group chat, optionally
  with an opening message.
* `get(chat)` fetches one chat by guid.
* `count(options)` counts visible chats, optionally including archived
  chats.
* `hasBackground(chat)` checks whether a chat has a custom background.
* `setBackground(chat, data)` replaces a chat background image.
* `removeBackground(chat)` clears a chat background image.
* `markRead(chat)` marks every unread message in the chat as read.
* `shareContactInfo(chat)` sends the local account's contact card.
* `setTyping(chat, isTyping)` starts or stops the transient typing
  indicator.

## Methods

### count()

```typescript
count(options?: { includeArchived: boolean }): Promise<number>
```

#### Parameters

<ResponseField name={"options"} type={"{ includeArchived: boolean }"} />

#### Returns

`Promise<number>`

### create()

```typescript
create(addresses: string[], options?: CreateChatOptions): Promise<CreateChatResult>
```

#### Parameters

<ResponseField name={"addresses"} type={"string[]"} required />

<ResponseField name={"options"} type={"CreateChatOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/CreateChatOptions"} />

#### Returns

<code>{"Promise<"}[CreateChatResult](/docs/reference/stable/advanced-imessage/grpc/interfaces/CreateChatResult){">"}</code>

### get()

```typescript
get(chat: string): Promise<Chat>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

#### Returns

<code>{"Promise<"}[Chat](/docs/reference/stable/advanced-imessage/grpc/interfaces/Chat){">"}</code>

### hasBackground()

```typescript
hasBackground(chat: string): Promise<boolean>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

#### Returns

`Promise<boolean>`

### markRead()

```typescript
markRead(chat: string): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

#### Returns

`Promise<void>`

### removeBackground()

```typescript
removeBackground(chat: string): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

#### Returns

`Promise<void>`

### setBackground()

```typescript
setBackground(chat: string, data: Uint8Array): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"data"} type={"Uint8Array"} required />

#### Returns

`Promise<void>`

### setTyping()

```typescript
setTyping(chat: string, isTyping: boolean): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"isTyping"} type={"boolean"} required />

#### Returns

`Promise<void>`

### shareContactInfo()

```typescript
shareContactInfo(chat: string): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.