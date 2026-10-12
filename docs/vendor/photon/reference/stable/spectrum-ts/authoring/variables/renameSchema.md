> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# renameSchema

> Rename the current chat.

Rename the current chat. Universal content — providers dispatch by
`content.type === "rename"` in their `send` action and decide their own
support story (e.g. iMessage only supports it for remote group chats).

`space.send(rename("New Name"))` is the canonical form; `space.rename(...)`
is universal sugar that delegates here.

Bidirectional: providers also surface platform rename events as inbound
`Message`s carrying this content; `message.sender` is the user who renamed
the chat (may be `undefined` when the platform recorded no actor).

Throws at build time if `displayName` is empty. Per-platform constraints
(e.g. group-only, remote-only) surface as `UnsupportedError` from the
provider's `send` action so the canonical and sugar forms share one
error path.

```typescript
const renameSchema: z.ZodObject<{ displayName: z.ZodString; type: z.ZodLiteral<"rename"> }, z.core.$strip>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.