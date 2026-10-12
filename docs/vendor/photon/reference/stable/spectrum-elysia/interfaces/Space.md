> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Space

## Properties

<ResponseField name={"__platform"} type={"string"} required />

<ResponseField name={"id"} type={"string"} required />

## Methods

### add()

```typescript
add(users: MemberInput): Promise<void>
```

Add members to the current chat. Sugar for `send(addMember(users))`.
Accepts a single `User` or id string, or an array of either — batches
land in one provider call. Fire-and-forget.

Universal API; per-platform constraints (e.g. iMessage: remote + group
only — a DM cannot be converted, create a group via `space.create`)
surface as `UnsupportedError` from the provider's send action.

#### Parameters

<ResponseField name={"users"} type={"MemberInput"} required />

#### Returns

`Promise<void>`

### avatar()

```typescript
avatar(input: string | URL, options?: { mimeType: string }): Promise<void>
```

Set or clear the current chat's avatar (group icon). Sugar for
`send(avatar(input, options?))`.

* `space.avatar("clear")` — remove the current avatar.
* `space.avatar("./icon.png")` — set from a filesystem path; MIME type
  is inferred from the extension.
* `space.avatar(new URL("https://…/icon.png"))` — fetch the avatar
  lazily over the network. Bytes stay in memory (safe in read-only
  environments); MIME type is inferred from the URL pathname extension.
* `space.avatar(buffer, { mimeType })` — set from in-memory bytes;
  `mimeType` is required (enforced at the type level).

Universal API; per-platform constraints (e.g. iMessage: remote + group
only) surface as `UnsupportedError` from the provider's send action.

#### Parameters

<ResponseField name={"input"} type={"string | URL"} required />

<ResponseField name={"options"} type={"{ mimeType: string }"} />

#### Returns

`Promise<void>`

```typescript
avatar(input: Buffer, options: { mimeType: string }): Promise<void>
```

#### Parameters

<ResponseField name={"input"} type={"Buffer"} required />

<ResponseField name={"options"} type={"{ mimeType: string }"} required />

#### Returns

`Promise<void>`

### edit()

```typescript
edit(message: Message<string, User, Space<unknown>> | undefined, newContent: ContentInput): Promise<void>
```

Rewrite a previously-sent outbound message. Sugar for
`send(edit(newContent, message))`. Accepts `Message | undefined` so
`send` results chain without narrowing; an undefined target throws.

#### Parameters

<ResponseField name={"message"} type={"Message<string, User, Space<unknown>> | undefined"} required>
  **Type:** <code>[Message](/docs/reference/stable/spectrum-elysia/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-elysia/interfaces/Space){"<unknown>> | undefined"}</code>
</ResponseField>

<ResponseField name={"newContent"} type={"ContentInput"} required />

#### Returns

`Promise<void>`

### getAvatar()

```typescript
getAvatar(): Promise<AvatarData | undefined>
```

Download the current chat avatar (group icon). Resolves `undefined` when
the chat has none. The result round-trips into the setter:
`space.avatar(res.data, { mimeType: res.mimeType })`.

Universal API; per-platform constraints (e.g. iMessage: remote + group
only — a DM throws) surface as `UnsupportedError`, as do platforms with
no implementation.

#### Returns

`Promise<AvatarData | undefined>`

### getDisplayName()

```typescript
getDisplayName(): Promise<string | undefined>
```

Read the current chat's display name (group/chat title). Resolves
`undefined` when the chat has none — an unnamed group, or a 1:1 chat on a
platform that stores no title for DMs. Round-trips into `space.rename()`.

Universal API; unlike `rename` the read is not group-only. Per-platform
constraints (e.g. iMessage: remote only) surface as `UnsupportedError`, as
do platforms with no implementation.

#### Returns

`Promise<string | undefined>`

### getMembers()

```typescript
getMembers(): Promise<User[]>
```

List the chat's current participants, excluding the agent's own account
where the platform can identify it. Each entry is a `User` tagged with
`__platform`; `id` is the user's canonical platform handle (the same
format `space.create` accepts), so results feed straight back into
`add()` / `remove()` / `space.create()`. Platform extras (e.g.
iMessage's `address`/`country`/`service`) ride along untyped — use the
platform instance's `getMembers(space)` for typed extras.

Universal API; per-platform constraints (e.g. iMessage: remote + group
only — a DM throws) surface as `UnsupportedError`, as do platforms with
no implementation.

#### Returns

`Promise<User[]>`

### getMessage()

```typescript
getMessage(id: string): Promise<Message<string, User, Space<unknown>> | undefined>
```

Look up a message in this space by its id. Returns `undefined` if the
platform has no way to resolve the id (e.g. cache miss with no by-id
SDK fallback). Used to materialize a `Message` for APIs that require one,
such as `reaction()`.

#### Parameters

<ResponseField name={"id"} type={"string"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/spectrum-elysia/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-elysia/interfaces/Space){"<unknown>> | undefined>"}</code>

### leave()

```typescript
leave(): Promise<void>
```

Leave the current chat with the agent's own account. Sugar for
`send(leaveSpace())`. Fire-and-forget.

Universal API; per-platform constraints (e.g. iMessage: remote + group
only) surface as `UnsupportedError` from the provider's send action.

#### Returns

`Promise<void>`

### read()

```typescript
read(message: Message): Promise<void>
```

Mark the conversation as read up to `message`, surfacing a read receipt
to the sender where the platform supports one. Sugar for
`send(read(message))`. Fire-and-forget; only inbound messages can be
marked read.

Granularity is per-platform: WhatsApp Business issues a receipt for
`message` and everything before it; iMessage (remote) marks the whole
chat read. Platforms with no read-receipt concept for bot conversations
(Telegram, Slack) silently no-op, so the signal is best-effort
everywhere — same contract as `startTyping()`.

#### Parameters

<ResponseField name={"message"} type={"Message"} typeHref={"/reference/stable/spectrum-elysia/interfaces/Message"} required />

#### Returns

`Promise<void>`

### remove()

```typescript
remove(users: MemberInput): Promise<void>
```

Remove members from the current chat. Sugar for
`send(removeMember(users))`. Accepts the same input shapes as `add`.
Fire-and-forget.

Universal API; per-platform constraints (e.g. iMessage: remote + group
only) surface as `UnsupportedError` from the provider's send action.

#### Parameters

<ResponseField name={"users"} type={"MemberInput"} required />

#### Returns

`Promise<void>`

### rename()

```typescript
rename(displayName: string): Promise<void>
```

Rename the current chat. Sugar for `send(rename(displayName))`.

Universal API; per-platform constraints (e.g. iMessage: remote + group
only) surface as `UnsupportedError` from the provider's send action.

#### Parameters

<ResponseField name={"displayName"} type={"string"} required />

#### Returns

`Promise<void>`

### responding()

```typescript
responding(fn: () => T | Promise<T>): Promise<T>
```

#### Parameters

<ResponseField name={"fn"} type={"() => T | Promise<T>"} required />

#### Returns

`Promise<T>`

### send()

```typescript
send(content: ReactionBuilder): Promise<Message<string, AgentSender, Space<unknown>> & { content: { emoji: string; target: Message<string, User>; type: "reaction" } } | undefined>
```

A reaction send resolves to the reaction Message (`content` narrowed to
`Reaction`) — the handle to `unsend()` later. Listed before the general
overload so `send(reaction(...))` picks it; every other `ContentBuilder`
fails the `ReactionBuilder` shape and falls through.

#### Parameters

<ResponseField name={"content"} type={"ReactionBuilder"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/spectrum-elysia/interfaces/Message){"<string, AgentSender, "}[Space](/docs/reference/stable/spectrum-elysia/interfaces/Space){"<unknown>> & { content: { emoji: string; target: "}[Message](/docs/reference/stable/spectrum-elysia/interfaces/Message){"<string, User>; type: \"reaction\" } } | undefined>"}</code>

```typescript
send(content: ContentInput): Promise<Message<string, AgentSender, Space<unknown>> | undefined>
```

#### Parameters

<ResponseField name={"content"} type={"ContentInput"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/spectrum-elysia/interfaces/Message){"<string, AgentSender, "}[Space](/docs/reference/stable/spectrum-elysia/interfaces/Space){"<unknown>> | undefined>"}</code>

```typescript
send(content: [ContentInput, ContentInput, unknown]): Promise<Message<string, AgentSender, Space<unknown>>[]>
```

#### Parameters

<ResponseField name={"content"} type={"[ContentInput, ContentInput, unknown]"} required />

#### Returns

<code>{"Promise<"}[Message](/docs/reference/stable/spectrum-elysia/interfaces/Message){"<string, AgentSender, "}[Space](/docs/reference/stable/spectrum-elysia/interfaces/Space){"<unknown>>[]>"}</code>

### startTyping()

```typescript
startTyping(): Promise<void>
```

#### Returns

`Promise<void>`

### stopTyping()

```typescript
stopTyping(): Promise<void>
```

#### Returns

`Promise<void>`

### unsend()

```typescript
unsend(message: Message<string, User, Space<unknown>> | undefined): Promise<void>
```

Retract a previously-sent outbound message. Sugar for
`send(unsend(message))`. Accepts `Message | undefined` so `send`
results chain without narrowing; an undefined target throws.

#### Parameters

<ResponseField name={"message"} type={"Message<string, User, Space<unknown>> | undefined"} required>
  **Type:** <code>[Message](/docs/reference/stable/spectrum-elysia/interfaces/Message){"<string, User, "}[Space](/docs/reference/stable/spectrum-elysia/interfaces/Space){"<unknown>> | undefined"}</code>
</ResponseField>

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.