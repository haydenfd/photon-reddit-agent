> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# reaction

```typescript
reaction(emoji: string, target: Message<string, User, Space<unknown>> | undefined): ReactionBuilder
```

Construct a `reaction` content value targeting the given message.

`space.send(reaction(emoji, message))` is the canonical form of
`message.react(emoji)`. It resolves to the reaction `Message`
(`content.type === "reaction"`) — keep it as the handle to `unsend()`
later. Resolves `undefined` only when the platform does not support
reactions (warned and skipped).

Accepts `Message | undefined` so `space.send` results chain without
narrowing (`send` resolves `undefined` when a platform skips unsupported
content); an undefined target throws at build time.

To react to a message known only by id, resolve it first via
`space.getMessage(id)`.

## Parameters

<ResponseField name={"emoji"} type={"string"} required />

<ResponseField name={"target"} type={"Message<string, User, Space<unknown>> | undefined"} required>
  **Type:** <code>[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>> | undefined"}</code>
</ResponseField>

## Returns

<code>[ReactionBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ReactionBuilder)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.