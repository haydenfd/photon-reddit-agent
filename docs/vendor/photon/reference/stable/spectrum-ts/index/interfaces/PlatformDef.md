> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# PlatformDef

> The full definition of a platform adapter.

Spectrum's platform API is shaped around the universal messaging contract:
**`messages` (inbound stream) + `send` (outbound dispatcher)**. Together
they handle 99% of what any platform integration needs to do — every
higher-level affordance (`message.reply`, `message.react`, `space.edit`,
`space.startTyping`, etc.) is sugar that routes through `send`.

Everything beyond those two is optional: `getMessage` is a known capability
that lives inside `actions?`; platform-specific event streams live inside
`events?` and surface as flat properties on the platform instance.

Minimum viable platform integration:
`name`, `config`, `lifecycle`, `user`, `space`, `messages`, `send`.

## Properties

<ResponseField name={"actions"} type={"Partial<PlatformWiseActions<_ResolvedSpace, _MessageType, NoInferClient<_Client…"}>
  Provider-defined methods exposed on the platform instance.

  Two tiers share this slot:

  1. **Platform-wise actions** (`getMessage`, `getMembers`, `getAvatar`) —
     framework-recognized names declared in `PlatformWiseActions`. Override
     by declaring the key here with the matching signature. The framework
     injects `ctx = { client, config, store }` as the first arg and
     surfaces the method on the platform instance
     (`im.getMessage(space, id)`). If omitted, the framework wires a
     default that throws `UnsupportedError`. Powers universal sugar like
     `space.getMessage(id)`.

  2. **Platform-specific actions** — free-form keys like `getAttachment`.
     Each gets `ctx = { client, config, store }` as the first arg; the
     public signature on `PlatformInstance<Def>` drops `ctx` and preserves
     the declared return type.

  Names that collide with reserved instance keys (`user`, `space`,
  `messages`, plus any declared `events` key) are skipped at runtime with
  a warning and excluded at the type level.
</ResponseField>

<ResponseField name={"config"} type={"_ConfigSchema"} required />

<ResponseField name={"events"} type={"_Events"}>
  Optional escape hatch: platform-specific event streams beyond the core
  `messages` stream (e.g. presence updates, read receipts). Each producer
  is surfaced as a flat property on both `spectrum` and the platform
  instance (e.g. `spectrum.presence`, `slack.readReceipt`).

  The key `messages` is reserved — the core inbound stream lives at the
  top level, not inside `events?`.

  99% of integrations don't need this — `messages` + `send` is the
  universal contract.
</ResponseField>

<ResponseField name={"lifecycle"} type={"{ createClient: (ctx: CreateClientContext<_ConfigSchema>) => Promise<_Client>; …"} required>
  **Type:** <code>{"{ createClient: (ctx: CreateClientContext<_ConfigSchema>) => Promise<_Client>; destroyClient: (ctx: { client: NoInferClient<_Client>; store: "}[Store](/docs/reference/stable/spectrum-ts/index/interfaces/Store){" }) => Promise<void> }"}</code>
</ResponseField>

<ResponseField name={"message"} type={"{ actions: _MessageActions; schema: _MessageSchema }"} />

<ResponseField name={"messages"} type={"EventProducer<_MessageType, _Client, output<_ConfigSchema>>"} required>
  **Type:** <code>[EventProducer](/docs/reference/stable/spectrum-ts/index/types/EventProducer){"<_MessageType, _Client, output<_ConfigSchema>>"}</code>

  Inbound message stream.

  * **Default mode**: returns an `AsyncIterable<ProviderMessageRecord>` —
    Spectrum wraps each emitted record into a fully-built `Message` and
    fans it out via `spectrum.messages`.
  * **Fusor mode**: when `lifecycle.createClient` returns a `FusorClient`
    (constructed via `fusor(platform, verify)`), the signature switches to a
    per-payload callback `(ctx: { payload, respond }) => …` whose return
    value is the message(s) to emit and whose optional `respond` call
    customises the HTTP reply sent back to fusor.

  One of the two universal platform contracts (along with `send`). 99% of
  integrations only need to implement `messages` + `send`.
</ResponseField>

<ResponseField name={"name"} type={"_Name"} required />

<ResponseField name={"send"} type={"(_: { client: NoInferClient<_Client>; config: output<_ConfigSchema>; content: {…"} required>
  **Type:** <code>{"(_: { client: NoInferClient<_Client>; config: output<_ConfigSchema>; content: { text: string; type: \"text\" } | { markdown: string; type: \"markdown\" } | { format: \"markdown\" | \"plain\"; stream: () => AsyncIterable<string>; type: \"streamText\" } | { raw: unknown; type: \"custom\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" } | { addresses: { city: string; country: string; postalCode: string; region: string; street: string; type: \"home\" | \"work\" | \"other\" }[]; birthday: string; emails: { type: \"home\" | \"work\" | \"other\"; value: string }[]; name: { first: string; formatted: string; last: string; middle: string; prefix: string; suffix: string }; note: string; org: { department: string; name: string; title: string }; phones: { type: \"mobile\" | \"home\" | \"work\" | \"other\"; value: string }[]; photo: { mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> }; raw: unknown; type: \"contact\"; urls: string[]; user: { __platform: string; id: string } } | { duration: number; id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"voice\" } | { type: \"richlink\"; url: string } | { layout: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodObject<{ caption: ZodOptional<ZodString>; image: ZodOptional<ZodCustom<Uint8Array<...>, Uint8Array<...>>>; imageSubtitle: ZodOptional<ZodString>; imageTitle: ZodOptional<ZodString>; subcaption: ZodOptional<ZodString>; summary: ZodOptional<ZodString>; trailingCaption: ZodOptional<ZodString>; trailingSubcaption: ZodOptional<ZodString> }, $strip>>>; live: boolean; type: \"app\"; url: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodURL>> } | { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){">; type: \"reaction\" } | { items: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>>[]; type: \"group\" } | { options: { title: string }[]; title: string; type: \"poll\" } | { option: { title: string }; poll: { options: { title: string }[]; title: string; type: \"poll\" }; selected: boolean; title: string; type: \"poll_option\" } | { content: { text: string; type: \"text\" } | { markdown: string; type: \"markdown\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" }; effect: string; type: \"effect\" } | { state: \"start\" | \"stop\"; type: \"typing\" } | { displayName: string; type: \"rename\" } | { action: { kind: \"set\"; mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> } | { kind: \"clear\" }; type: \"avatar\" } | { members: string[]; type: \"addMember\" } | { members: string[]; type: \"removeMember\" } | { type: \"leaveSpace\" } | { content: { markdown: string; type: \"markdown\" } | { addresses: { city: string; country: string; postalCode: string; region: string; street: string; type: \"home\" | \"work\" | \"other\" }[]; birthday: string; emails: { type: \"home\" | \"work\" | \"other\"; value: string }[]; name: { first: string; formatted: string; last: string; middle: string; prefix: string; suffix: string }; note: string; org: { department: string; name: string; title: string }; phones: { type: \"mobile\" | \"home\" | \"work\" | \"other\"; value: string }[]; photo: { mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>> }; raw: unknown; type: \"contact\"; urls: string[]; user: { __platform: string; id: string } } | { raw: unknown; type: \"custom\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" } | { layout: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodObject<{ caption: ZodOptional<...>; image: ZodOptional<...>; imageSubtitle: ZodOptional<...>; imageTitle: ZodOptional<...>; subcaption: ZodOptional<...>; summary: ZodOptional<...>; trailingCaption: ZodOptional<...>; trailingSubcaption: ZodOptional<...> }, $strip>>>; live: boolean; type: \"app\"; url: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodURL>> } | { items: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>>[]; type: \"group\" } | { type: \"richlink\"; url: string } | { duration: number; id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"voice\" } | { options: { title: string }[]; title: string; type: \"poll\" } | { option: { title: string }; poll: { options: { title: string }[]; title: string; type: \"poll\" }; selected: boolean; title: string; type: \"poll_option\" } | { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>>; type: \"reaction\" } | { format: \"markdown\" | \"plain\"; stream: () => AsyncIterable<string>; type: \"streamText\" } | { content: { markdown: string; type: \"markdown\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>>; type: \"attachment\" }; effect: string; type: \"effect\" } | { state: \"start\" | \"stop\"; type: \"typing\" } | { displayName: string; type: \"rename\" } | { action: { kind: \"set\"; mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>> } | { kind: \"clear\" }; type: \"avatar\" } | { members: string[]; type: \"addMember\" } | { members: string[]; type: \"removeMember\" } | { type: \"leaveSpace\" }; target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){">; type: \"reply\" } | { content: { markdown: string; type: \"markdown\" } | { addresses: { city: string; country: string; postalCode: string; region: string; street: string; type: \"home\" | \"work\" | \"other\" }[]; birthday: string; emails: { type: \"home\" | \"work\" | \"other\"; value: string }[]; name: { first: string; formatted: string; last: string; middle: string; prefix: string; suffix: string }; note: string; org: { department: string; name: string; title: string }; phones: { type: \"mobile\" | \"home\" | \"work\" | \"other\"; value: string }[]; photo: { mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>> }; raw: unknown; type: \"contact\"; urls: string[]; user: { __platform: string; id: string } } | { raw: unknown; type: \"custom\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"attachment\" } | { layout: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodObject<{ caption: ZodOptional<...>; image: ZodOptional<...>; imageSubtitle: ZodOptional<...>; imageTitle: ZodOptional<...>; subcaption: ZodOptional<...>; summary: ZodOptional<...>; trailingCaption: ZodOptional<...>; trailingSubcaption: ZodOptional<...> }, $strip>>>; live: boolean; type: \"app\"; url: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodURL>> } | { items: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>>[]; type: \"group\" } | { type: \"richlink\"; url: string } | { duration: number; id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<ReadableStream<unknown>, ReadableStream<unknown>>>>; type: \"voice\" } | { options: { title: string }[]; title: string; type: \"poll\" } | { option: { title: string }; poll: { options: { title: string }[]; title: string; type: \"poll\" }; selected: boolean; title: string; type: \"poll_option\" } | { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>>; type: \"reaction\" } | { format: \"markdown\" | \"plain\"; stream: () => AsyncIterable<string>; type: \"streamText\" } | { content: { markdown: string; type: \"markdown\" } | { text: string; type: \"text\" } | { id: string; mimeType: string; name: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>>; size: number; stream: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>>; type: \"attachment\" }; effect: string; type: \"effect\" } | { state: \"start\" | \"stop\"; type: \"typing\" } | { displayName: string; type: \"rename\" } | { action: { kind: \"set\"; mimeType: string; read: $InferOuterFunctionType<ZodTuple<readonly [], null>, ZodPromise<ZodCustom<..., ...>>> } | { kind: \"clear\" }; type: \"avatar\" } | { members: string[]; type: \"addMember\" } | { members: string[]; type: \"removeMember\" } | { type: \"leaveSpace\" }; target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){">; type: \"edit\" } | { target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){">; type: \"unsend\" } | { target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){">; type: \"read\" }; space: _ResolvedSpace & SpaceRef; store: "}[Store](/docs/reference/stable/spectrum-ts/index/interfaces/Store){" }) => Promise<"}[ProviderMessageRecord](/docs/reference/stable/spectrum-ts/authoring/types/ProviderMessageRecord){" | undefined>"}</code>

  Send a piece of `Content` to a space. The provider inspects
  `content.type` and dispatches accordingly — text, attachments, reactions,
  replies, edits, typing indicators, and any other content type all flow
  through this single action.

  Returns a `ProviderMessageRecord` (id + timestamp) for content that
  produces a message — including reactions, whose record is the unsend
  handle (synthesize a deterministic id when the platform assigns none);
  returns `undefined` only for fire-and-forget control signals (typing,
  edits, renames, avatars, unsends) on platforms that don't return ids.

  One of the two universal platform contracts (along with `messages`).
</ResponseField>

<ResponseField name={"space"} type={"{ actions: _SpaceActions; create: (_: { client: NoInferClient<_Client>; config:…"} required>
  **Type:** <code>{"{ actions: _SpaceActions; create: (_: { client: NoInferClient<_Client>; config: output<_ConfigSchema>; input: { params: _SpaceParamsSchema extends ZodType<object, unknown, $ZodTypeInternals<object, unknown>> ? output<_SpaceParamsSchema> : undefined; users: _ResolvedUser & { __platform: _Name }[] }; store: "}[Store](/docs/reference/stable/spectrum-ts/index/interfaces/Store){" }) => Promise<_ResolvedSpace>; get: (_: { client: NoInferClient<_Client>; config: output<_ConfigSchema>; input: { id: string; params: _SpaceParamsSchema extends ZodType<object, unknown, $ZodTypeInternals<object, unknown>> ? output<_SpaceParamsSchema> : undefined }; store: "}[Store](/docs/reference/stable/spectrum-ts/index/interfaces/Store){" }) => Promise<_ResolvedSpace>; params: _SpaceParamsSchema; schema: _SpaceSchema }"}</code>
</ResponseField>

<ResponseField name={"user"} type={"{ resolve: (_: { client: NoInferClient<_Client>; config: output<_ConfigSchema>;…"} required>
  **Type:** <code>{"{ resolve: (_: { client: NoInferClient<_Client>; config: output<_ConfigSchema>; input: { userID: string }; store: "}[Store](/docs/reference/stable/spectrum-ts/index/interfaces/Store){" }) => Promise<_ResolvedUser>; schema: _UserSchema }"}</code>
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.