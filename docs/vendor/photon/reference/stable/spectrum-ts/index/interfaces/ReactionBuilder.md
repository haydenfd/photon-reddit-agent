> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ReactionBuilder

> A whose build is statically known to produce content.

A `ContentBuilder` whose build is statically known to produce `Reaction`
content. `space.send` overloads on this so `space.send(reaction(...))`
returns a Message with `content` narrowed to `Reaction`, matching
`message.react()`.

```typescript
interface ReactionBuilder extends ContentBuilder
```

## Methods

### build()

```typescript
build(): Promise<{ emoji: string; target: Message<string, User>; type: "reaction" }>
```

#### Returns

<code>{"Promise<{ emoji: string; target: "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){">; type: \"reaction\" }>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.