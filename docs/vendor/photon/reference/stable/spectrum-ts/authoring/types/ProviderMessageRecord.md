> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ProviderMessageRecord

> A message a provider produced — used for both inbound (, ) and outbound () flows.

A message a provider produced — used for both inbound (`messages`,
`actions.getMessage`) and outbound (`send`) flows. Providers return their native
record shape (including platform extras like `partIndex`/`parentId` for
iMessage) and the platform `wrapProviderMessage` pipeline turns it into a
fully-built Message.

`sender` is optional because outbound sends often can't synthesize one
(the SDK doesn't surface the bot's own handle); inbound providers are
expected to populate it.

```typescript
type ProviderMessageRecord = { content: Content; direction: "inbound" | "outbound"; id: string; sender: { id: string } & Record<string, unknown>; space: { id: string } & Record<string, unknown>; timestamp: Date } & Record<string, unknown>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.