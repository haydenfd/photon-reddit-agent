> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# read

```typescript
read(target: Message): ContentBuilder
```

Construct a `read` content value marking the conversation read up to
`target`.

Only inbound messages (those received from a user) can be marked read;
calling this with an outbound target throws at build time so the misuse
surfaces before the send pipeline runs. The target is required (not
`Message | undefined` like `unsend`): read targets come from the inbound
stream, never from a chainable `send()` result.

## Parameters

<ResponseField name={"target"} type={"Message"} typeHref={"/reference/stable/spectrum-ts/index/interfaces/Message"} required />

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.