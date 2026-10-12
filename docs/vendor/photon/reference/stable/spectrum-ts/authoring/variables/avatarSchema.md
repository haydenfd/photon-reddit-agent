> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# avatarSchema

> Set or clear the chat avatar (group icon).

Set or clear the chat avatar (group icon). Universal content — providers
dispatch by `content.type === "avatar"` in their `send` action and decide
their own support story (e.g. iMessage only supports it for remote group
chats).

`space.send(avatar(...))` is the canonical form; `space.avatar(...)` is
universal sugar that delegates here. Per-platform constraints (e.g.
group-only, remote-only) surface as `UnsupportedError` from the provider's
`send` action so the canonical and sugar forms share one error path.

Bidirectional: providers also surface platform icon changes as inbound
`Message`s carrying this content — `action.kind === "set"` arrives with
the fetched icon behind `read()`, `"clear"` mirrors icon removal.
`message.sender` is the user who changed it (may be `undefined` when the
platform recorded no actor).

```typescript
const avatarSchema: z.ZodObject<{ action: z.ZodDiscriminatedUnion<[z.ZodObject<{ kind: z.ZodLiteral<"set">; mimeType: z.ZodString; read: z.ZodFunction<z.ZodTuple<readonly [], null>, z.ZodPromise<z.ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>>> }, z.core.$strip>, z.ZodObject<{ kind: z.ZodLiteral<"clear"> }, z.core.$strip>], "kind">; type: z.ZodLiteral<"avatar"> }, z.core.$strip>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.