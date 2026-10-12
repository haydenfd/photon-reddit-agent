> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# AdvancedIMessageKit

```typescript
class AdvancedIMessageKit extends unknown implements TypedEventEmitter
```

## Constructor

```typescript
AdvancedIMessageKit(config?: ClientConfig): AdvancedIMessageKit
```

### Parameters

<ResponseField name={"config"} type={"ClientConfig"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ClientConfig"} />

### Returns

<code>[AdvancedIMessageKit](/docs/reference/stable/advanced-imessage-kit/classes/AdvancedIMessageKit)</code>

## Properties

<ResponseField name={"attachments"} type={"AttachmentModule"} required />

<ResponseField name={"chats"} type={"ChatModule"} required />

<ResponseField name={"config"} type={"ClientConfig"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ClientConfig"} required />

<ResponseField name={"contacts"} type={"ContactModule"} required />

<ResponseField name={"facetime"} type={"FaceTimeModule"} required />

<ResponseField name={"handles"} type={"HandleModule"} required />

<ResponseField name={"http"} type={"AxiosInstance"} required />

<ResponseField name={"icloud"} type={"ICloudModule"} required />

<ResponseField name={"logger"} type={"Logger"} required />

<ResponseField name={"messages"} type={"MessageModule"} required />

<ResponseField name={"polls"} type={"PollModule"} required />

<ResponseField name={"scheduledMessages"} type={"ScheduledMessageModule"} required />

<ResponseField name={"server"} type={"ServerModule"} required />

<ResponseField name={"socket"} type={"Socket<DefaultEventsMap>"} required />

## Methods

### addListener()

```typescript
addListener(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

### clearProcessedMessages()

```typescript
clearProcessedMessages(maxSize?: number): void
```

Clear processed message records (prevent memory leaks)

#### Parameters

<ResponseField name={"maxSize"} type={"number"}>
  Maximum number of messages to retain, default 1000
</ResponseField>

### close()

```typescript
close(): Promise<void>
```

#### Returns

`Promise<void>`

### connect()

```typescript
connect(): Promise<void>
```

#### Returns

`Promise<void>`

### emit()

```typescript
emit(event: K, args: PhotonEventMap[K] extends undefined ? [] : [PhotonEventMap[K]]): boolean
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"args"} type={"PhotonEventMap[K] extends undefined ? [] : [PhotonEventMap[K]]"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? [] : ["}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]]"}</code>
</ResponseField>

#### Returns

`boolean`

### enqueueSend()

```typescript
enqueueSend(task: () => Promise<T>): Promise<T>
```

Enqueue a send operation to ensure sequential delivery.
All send operations (messages, attachments, stickers) should use this method
to guarantee order for a single user.

#### Parameters

<ResponseField name={"task"} type={"() => Promise<T>"} required>
  The async send operation to enqueue
</ResponseField>

#### Returns

`Promise<T>`

Promise that resolves with the task result

### getInstance()

```typescript
getInstance(config?: ClientConfig): AdvancedIMessageKit
```

#### Parameters

<ResponseField name={"config"} type={"ClientConfig"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ClientConfig"} />

#### Returns

<code>[AdvancedIMessageKit](/docs/reference/stable/advanced-imessage-kit/classes/AdvancedIMessageKit)</code>

### getProcessedMessageCount()

```typescript
getProcessedMessageCount(): number
```

Get the count of processed messages

#### Returns

`number`

### off()

```typescript
off(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

### on()

```typescript
on(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

### once()

```typescript
once(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

### removeListener()

```typescript
removeListener(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.