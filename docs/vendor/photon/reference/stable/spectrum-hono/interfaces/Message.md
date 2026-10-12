> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Message

## Properties

<ResponseField name={"content"} type={"{ text: string; type: \"text\" } | { markdown: string; type: \"markdown\" } | { for…"} required>
  **Type:** <code>{"{ text: string; type: \"text\" } | { markdown: string; type: \"markdown\" } | { format: \"markdown\" | \"plain\"; stream: () => AsyncIterable<string>; type: \"streamText\" } | { raw: unknown; type: \"custom\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" } | { addresses: { city: string; country: string; postalCode: string; region: string; street: string; type: \"home\" | \"work\" | \"other\" }[]; birthday: string; emails: { type: \"home\" | \"work\" | \"other\"; value: string }[]; name: { first: string; formatted: string; last: string; middle: string; prefix: string; suffix: string }; note: string; org: { department: string; name: string; title: string }; phones: { type: \"mobile\" | \"home\" | \"work\" | \"other\"; value: string }[]; photo: { mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> }; raw: unknown; type: \"contact\"; urls: string[]; user: { __platform: string; id: string } } | { duration: number; id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"voice\" } | { type: \"richlink\"; url: string } | { layout: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodObject<{ caption: ZodOptional<ZodString>; image: ZodOptional<ZodCustom<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>>; imageSubtitle: ZodOptional<ZodString>; imageTitle: ZodOptional<ZodString>; subcaption: ZodOptional<ZodString>; summary: ZodOptional<ZodString>; trailingCaption: ZodOptional<ZodString>; trailingSubcaption: ZodOptional<ZodString> }, $strip>>>; live: boolean; type: \"app\"; url: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodURL>> } | { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User>; type: \"reaction\" } | { items: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-hono/interfaces/Space){"<unknown>>[]; type: \"group\" } | { options: { title: string }[]; title: string; type: \"poll\" } | { option: { title: string }; poll: { options: { title: string }[]; title: string; type: \"poll\" }; selected: boolean; title: string; type: \"poll_option\" } | { content: { text: string; type: \"text\" } | { markdown: string; type: \"markdown\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" }; effect: string; type: \"effect\" } | { state: \"start\" | \"stop\"; type: \"typing\" } | { displayName: string; type: \"rename\" } | { action: { kind: \"set\"; mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> } | { kind: \"clear\" }; type: \"avatar\" } | { members: string[]; type: \"addMember\" } | { members: string[]; type: \"removeMember\" } | { type: \"leaveSpace\" } | { content: { markdown: string; type: \"markdown\" } | { addresses: { city: string; country: string; postalCode: string; region: string; street: string; type: \"home\" | \"work\" | \"other\" }[]; birthday: string; emails: { type: \"home\" | \"work\" | \"other\"; value: string }[]; name: { first: string; formatted: string; last: string; middle: string; prefix: string; suffix: string }; note: string; org: { department: string; name: string; title: string }; phones: { type: \"mobile\" | \"home\" | \"work\" | \"other\"; value: string }[]; photo: { mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> }; raw: unknown; type: \"contact\"; urls: string[]; user: { __platform: string; id: string } } | { raw: unknown; type: \"custom\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" } | { layout: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodObject<{ caption: ZodOptional<ZodString>; image: ZodOptional<ZodCustom<Uint8Array<...>, Uint8Array<...>>>; imageSubtitle: ZodOptional<ZodString>; imageTitle: ZodOptional<ZodString>; subcaption: ZodOptional<ZodString>; summary: ZodOptional<ZodString>; trailingCaption: ZodOptional<ZodString>; trailingSubcaption: ZodOptional<ZodString> }, $strip>>>; live: boolean; type: \"app\"; url: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodURL>> } | { items: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-hono/interfaces/Space){"<unknown>>[]; type: \"group\" } | { type: \"richlink\"; url: string } | { duration: number; id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"voice\" } | { options: { title: string }[]; title: string; type: \"poll\" } | { option: { title: string }; poll: { options: { title: string }[]; title: string; type: \"poll\" }; selected: boolean; title: string; type: \"poll_option\" } | { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-hono/interfaces/Space){"<unknown>>; type: \"reaction\" } | { format: \"markdown\" | \"plain\"; stream: () => AsyncIterable<string>; type: \"streamText\" } | { content: { markdown: string; type: \"markdown\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" }; effect: string; type: \"effect\" } | { state: \"start\" | \"stop\"; type: \"typing\" } | { displayName: string; type: \"rename\" } | { action: { kind: \"set\"; mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> } | { kind: \"clear\" }; type: \"avatar\" } | { members: string[]; type: \"addMember\" } | { members: string[]; type: \"removeMember\" } | { type: \"leaveSpace\" }; target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User>; type: \"reply\" } | { content: { markdown: string; type: \"markdown\" } | { addresses: { city: string; country: string; postalCode: string; region: string; street: string; type: \"home\" | \"work\" | \"other\" }[]; birthday: string; emails: { type: \"home\" | \"work\" | \"other\"; value: string }[]; name: { first: string; formatted: string; last: string; middle: string; prefix: string; suffix: string }; note: string; org: { department: string; name: string; title: string }; phones: { type: \"mobile\" | \"home\" | \"work\" | \"other\"; value: string }[]; photo: { mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> }; raw: unknown; type: \"contact\"; urls: string[]; user: { __platform: string; id: string } } | { raw: unknown; type: \"custom\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" } | { layout: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodObject<{ caption: ZodOptional<ZodString>; image: ZodOptional<ZodCustom<Uint8Array<...>, Uint8Array<...>>>; imageSubtitle: ZodOptional<ZodString>; imageTitle: ZodOptional<ZodString>; subcaption: ZodOptional<ZodString>; summary: ZodOptional<ZodString>; trailingCaption: ZodOptional<ZodString>; trailingSubcaption: ZodOptional<ZodString> }, $strip>>>; live: boolean; type: \"app\"; url: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodURL>> } | { items: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-hono/interfaces/Space){"<unknown>>[]; type: \"group\" } | { type: \"richlink\"; url: string } | { duration: number; id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"voice\" } | { options: { title: string }[]; title: string; type: \"poll\" } | { option: { title: string }; poll: { options: { title: string }[]; title: string; type: \"poll\" }; selected: boolean; title: string; type: \"poll_option\" } | { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-hono/interfaces/Space){"<unknown>>; type: \"reaction\" } | { format: \"markdown\" | \"plain\"; stream: () => AsyncIterable<string>; type: \"streamText\" } | { content: { markdown: string; type: \"markdown\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" }; effect: string; type: \"effect\" } | { state: \"start\" | \"stop\"; type: \"typing\" } | { displayName: string; type: \"rename\" } | { action: { kind: \"set\"; mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> } | { kind: \"clear\" }; type: \"avatar\" } | { members: string[]; type: \"addMember\" } | { members: string[]; type: \"removeMember\" } | { type: \"leaveSpace\" }; target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User>; type: \"edit\" } | { target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User>; type: \"unsend\" } | { target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User>; type: \"read\" }"}</code>
</ResponseField>

<ResponseField name={"direction"} type={"\"inbound\" | \"outbound\""} required />

<ResponseField name={"id"} type={"string"} required />

<ResponseField name={"platform"} type={"TPlatform"} required />

<ResponseField name={"sender"} type={"TSender | undefined"} required />

<ResponseField name={"space"} type={"TSpace"} required />

<ResponseField name={"timestamp"} type={"Date"} required />

## Methods

### edit()

```typescript
edit(newContent: ContentInput): Promise<void>
```

#### Parameters

<ResponseField name={"newContent"} type={"ContentInput"} required />

#### Returns

`Promise<void>`

### react()

```typescript
react(reaction: string): Promise<Message<TPlatform, AgentSender, TSpace> & { content: { emoji: string; target: Message<string, User>; type: "reaction" } } | undefined>
```

React to this message. Resolves to the reaction `Message` (content
narrowed to `Reaction`) — keep it as the handle to `unsend()` later.
Resolves `undefined` when the platform does not support reactions
(warned and skipped).

The return type is an inline intersection rather than a `TContent`
generic on `Message`: a content type parameter would need `Content` as
its default, and `Content`'s schemas (`reaction`, `reply`, `edit`,
`group`) reference `Message` — TS rejects the resulting circular
default (TS2716).

#### Parameters

<ResponseField name={"reaction"} type={"string"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<TPlatform, AgentSender, TSpace> & { content: { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<string, User>; type: \"reaction\" } } | undefined>"}</code>

### read()

```typescript
read(): Promise<void>
```

Mark this message (and everything before it in the conversation) as
read. Sugar for `space.send(read(this))`. Reads are fire-and-forget;
per-platform granularity and support (e.g. iMessage marks the whole
chat; Telegram/Slack silently no-op) surface from the provider's send
action. Only inbound messages can be marked read; calling this on an
outbound message throws.

#### Returns

`Promise<void>`

### reply()

```typescript
reply(content: ContentInput): Promise<Message<TPlatform, AgentSender, TSpace> | undefined>
```

#### Parameters

<ResponseField name={"content"} type={"ContentInput"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<TPlatform, AgentSender, TSpace> | undefined>"}</code>

```typescript
reply(content: [ContentInput, ContentInput, unknown]): Promise<Message<TPlatform, AgentSender, TSpace>[]>
```

#### Parameters

<ResponseField name={"content"} type={"[ContentInput, ContentInput, unknown]"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/spectrum-hono/interfaces/Message){"<TPlatform, AgentSender, TSpace>[]>"}</code>

### unsend()

```typescript
unsend(): Promise<void>
```

Retract this message. Sugar for `space.send(unsend(this))`. Unsends are
fire-and-forget; per-platform support and constraints (e.g. iMessage's
\~2-minute unsend window for regular messages) surface from the
provider's send action. Only outbound messages can be unsent; calling
this on an inbound message throws.

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.