> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# IMessageSDK

> IMessage SDK Core Class

## Constructor

```typescript
IMessageSDK(config?: IMessageConfig, dependencies?: SDKDependencies): IMessageSDK
```

### Parameters

<ResponseField name={"config"} type={"IMessageConfig"} typeHref={"/reference/stable/imessage-kit/interfaces/IMessageConfig"} />

<ResponseField name={"dependencies"} type={"SDKDependencies"} />

### Returns

<code>[IMessageSDK](/docs/reference/stable/imessage-kit/classes/IMessageSDK)</code>

## Properties

<ResponseField name={"plugins"} type={"PluginManager"} required>
  Get plugin manager
</ResponseField>

## Methods

### close()

```typescript
close(): Promise<void>
```

Close SDK and release resources

#### Returns

`Promise<void>`

### getMessages()

```typescript
getMessages(filter?: MessageFilter): Promise<MessageQueryResult>
```

Query messages

#### Parameters

<ResponseField name={"filter"} type={"MessageFilter"} typeHref={"/reference/stable/imessage-kit/interfaces/MessageFilter"} />

#### Returns

<code>{"Promise<"}[MessageQueryResult](/docs/reference/stable/imessage-kit/interfaces/MessageQueryResult){">"}</code>

### getUnreadMessages()

```typescript
getUnreadMessages(): Promise<UnreadMessagesResult>
```

Get unread messages (grouped by sender)

```ts
const unread = await sdk.getUnreadMessages()
console.log(`${unread.total} unread messages from ${unread.senderCount} senders`)
for (const { sender, messages } of unread.groups) {
  console.log(`${sender}: ${messages.length} messages`)
}
```

#### Returns

<code>{"Promise<"}[UnreadMessagesResult](/docs/reference/stable/imessage-kit/interfaces/UnreadMessagesResult){">"}</code>

Unread messages with statistics

### listChats()

```typescript
listChats(options?: number | ListChatsOptions): Promise<ChatSummary[]>
```

List chats with filtering and sorting options

```ts
// Get all chats
const all = await sdk.listChats()

// Get recent group chats with unread messages
const groups = await sdk.listChats({
  type: 'group',
  hasUnread: true,
  limit: 20
})

// Search chats by name
const found = await sdk.listChats({
  search: 'John',
  sortBy: 'name'
})

// Backward compatible: limit only
const recent = await sdk.listChats({ limit: 50 })
```

#### Parameters

<ResponseField name={"options"} type={"number | ListChatsOptions"}>
  **Type:** <code>{"number | "}[ListChatsOptions](/docs/reference/stable/imessage-kit/interfaces/ListChatsOptions)</code>

  Filter and sort options (or a number for backward compatibility)
</ResponseField>

#### Returns

<code>{"Promise<"}[ChatSummary](/docs/reference/stable/imessage-kit/interfaces/ChatSummary){"[]>"}</code>

Array of chat summaries with unread counts

### message()

```typescript
message(message: Message): MessageChain
```

Create message processing chain

#### Parameters

<ResponseField name={"message"} type={"Message"} typeHref={"/reference/stable/imessage-kit/interfaces/Message"} required />

#### Returns

<code>[MessageChain](/docs/reference/stable/imessage-kit/classes/MessageChain)</code>

### send()

```typescript
send(to: string, content: string | { files: string[]; images: string[]; text: string }): Promise<SendResult>
```

Send message to recipient (phone/email) or chat (chatId)

Automatically detects whether the target is:

* A recipient (phone number or email): e.g., '+1234567890', '[user@example.com](mailto:user@example.com)'
* A chatId (group or DM): e.g., 'chat123...', 'iMessage;+1234567890'

```ts
// Send to phone number
await sdk.send('+1234567890', 'Hello')

// Send to email
await sdk.send('user@example.com', 'Hello')

// Send to group chat
await sdk.send('chat123...', 'Hello')

// Send with attachments
await sdk.send('+1234567890', { images: ['/img.jpg'] })
await sdk.send('chat123...', { text: 'Hi', files: ['/doc.pdf'] })
```

#### Parameters

<ResponseField name={"to"} type={"string"} required />

<ResponseField name={"content"} type={"string | { files: string[]; images: string[]; text: string }"} required />

#### Returns

<code>{"Promise<"}[SendResult](/docs/reference/stable/imessage-kit/interfaces/SendResult){">"}</code>

### sendBatch()

```typescript
sendBatch(messages: { content: string | { files: string[]; images: string[]; text: string }; to: string }[]): Promise<{ error: Error; result: SendResult; success: boolean; to: string }[]>
```

Send batch messages (concurrency controlled by sender's maxConcurrent config)

```ts
const results = await sdk.sendBatch([
  { to: '+1234567890', content: 'Hello' },
  { to: '+0987654321', content: 'Hi' },
])

for (const result of results) {
  if (result.success) {
    console.log('Send success:', result.to)
  } else {
    console.error('Send failed:', result.to, result.error)
  }
}
```

#### Parameters

<ResponseField name={"messages"} type={"{ content: string | { files: string[]; images: string[]; text: string }; to: st…"} required>
  Batch message list
</ResponseField>

#### Returns

<code>{"Promise<{ error: Error; result: "}[SendResult](/docs/reference/stable/imessage-kit/interfaces/SendResult){"; success: boolean; to: string }[]>"}</code>

List of send results (including success and failure)

### sendFile()

```typescript
sendFile(to: string, filePath: string, text?: string): Promise<SendResult>
```

Send file (convenience method)

Supports both recipient (phone/email) and chatId

```ts
// Send to phone number
await sdk.sendFile('+1234567890', '/path/to/document.pdf')

// Send to group chat
await sdk.sendFile('chat123...', '/path/to/document.pdf', 'Here is the file')
```

#### Parameters

<ResponseField name={"to"} type={"string"} required />

<ResponseField name={"filePath"} type={"string"} required />

<ResponseField name={"text"} type={"string"} />

#### Returns

<code>{"Promise<"}[SendResult](/docs/reference/stable/imessage-kit/interfaces/SendResult){">"}</code>

### sendFiles()

```typescript
sendFiles(to: string, filePaths: string[], text?: string): Promise<SendResult>
```

Send multiple files (convenience method)

Supports both recipient (phone/email) and chatId

```ts
// Send to phone number
await sdk.sendFiles('+1234567890', ['/file1.pdf', '/file2.csv'])

// Send to group chat
await sdk.sendFiles('chat123...', ['/data.xlsx'], 'Check these files')
```

#### Parameters

<ResponseField name={"to"} type={"string"} required />

<ResponseField name={"filePaths"} type={"string[]"} required />

<ResponseField name={"text"} type={"string"} />

#### Returns

<code>{"Promise<"}[SendResult](/docs/reference/stable/imessage-kit/interfaces/SendResult){">"}</code>

### startWatching()

```typescript
startWatching(events?: WatcherEvents): Promise<void>
```

Start watching for new messages

#### Parameters

<ResponseField name={"events"} type={"WatcherEvents"} typeHref={"/reference/stable/imessage-kit/interfaces/WatcherEvents"} />

#### Returns

`Promise<void>`

### stopWatching()

```typescript
stopWatching(): void
```

Stop watching for new messages

### use()

```typescript
use(plugin: Plugin): this
```

Register plugin

#### Parameters

<ResponseField name={"plugin"} type={"Plugin"} typeHref={"/reference/stable/imessage-kit/interfaces/Plugin"} required />

#### Returns

`this`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.