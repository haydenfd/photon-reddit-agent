> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# unsend

```typescript
unsend(target: Message<string, User, Space<unknown>> | undefined): ContentBuilder
```

Construct an `unsend` content value retracting `target`.

Only outbound messages (those sent by the agent) can be unsent; calling
this with an inbound target throws at build time so the misuse surfaces
before the send pipeline runs.

Accepts `Message | undefined` so `space.send` results chain without
narrowing (`send` resolves `undefined` when a platform skips unsupported
content); an undefined target throws at build time.

## Parameters

<ResponseField name={"target"} type={"Message<string, User, Space<unknown>> | undefined"} required>
  **Type:** <code>[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>> | undefined"}</code>
</ResponseField>

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.