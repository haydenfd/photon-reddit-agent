> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# GroupsResource

> Group APIs.

* `setDisplayName(chat, displayName, options)` renames a group chat.
* `addParticipants(chat, addresses, options)` invites addresses into a
  group chat.
* `removeParticipants(chat, addresses, options)` removes addresses from a
  group chat.
* `leave(chat, options)` makes the local account leave a group chat.
* `setIcon(chat, data, options)` replaces the group photo.
* `getIcon(chat)` downloads the group photo bytes and MIME type.
* `removeIcon(chat, options)` clears the group photo.

## Methods

### addParticipants()

```typescript
addParticipants(chat: string, addresses: string[], options?: IdempotencyOptions): Promise<Chat>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"addresses"} type={"string[]"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

<code>{"Promise<"}[Chat](/docs/reference/stable/advanced-imessage/grpc/interfaces/Chat){">"}</code>

### getIcon()

```typescript
getIcon(chat: string): Promise<GroupIcon>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

#### Returns

<code>{"Promise<"}[GroupIcon](/docs/reference/stable/advanced-imessage/grpc/interfaces/GroupIcon){">"}</code>

### leave()

```typescript
leave(chat: string, options?: IdempotencyOptions): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

`Promise<void>`

### removeIcon()

```typescript
removeIcon(chat: string, options?: IdempotencyOptions): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

`Promise<void>`

### removeParticipants()

```typescript
removeParticipants(chat: string, addresses: string[], options?: IdempotencyOptions): Promise<Chat>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"addresses"} type={"string[]"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

<code>{"Promise<"}[Chat](/docs/reference/stable/advanced-imessage/grpc/interfaces/Chat){">"}</code>

### setDisplayName()

```typescript
setDisplayName(chat: string, displayName: string, options?: IdempotencyOptions): Promise<Chat>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"displayName"} type={"string"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

<code>{"Promise<"}[Chat](/docs/reference/stable/advanced-imessage/grpc/interfaces/Chat){">"}</code>

### setIcon()

```typescript
setIcon(chat: string, data: Uint8Array, options?: IdempotencyOptions): Promise<void>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"data"} type={"Uint8Array"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.