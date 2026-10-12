> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# nativeContactCard

```typescript
nativeContactCard(): ContentBuilder
```

Share the bot account's native iMessage contact card (name + photo) with the
chat. iMessage-only, remote-only.

`space.send(nativeContactCard())` is the canonical form; `space.shareContactCard()`
is sugar attached via `PlatformDef.space.actions` (only typed on
`PlatformSpace<IMessageDef>`).

This is an explicit, on-demand share and always fires — unlike the automatic
best-effort share gated behind the `imessageSynced` project profile, which
dedupes to once per chat per 24h (see `remote/contact-share.ts`). Works in
both DMs and group chats; the recipient chooses whether to accept the card.

`ContactCard` is intentionally not a member of the universal `Content`
union — the `as unknown as Content` cast keeps the builder shape compatible
with the framework's `ContentBuilder.build(): Promise<Content>` signature.
The framework treats it as a fire-and-forget control signal at runtime.

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.