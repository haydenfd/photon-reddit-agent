> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChannelVisibility

> Represents the visibility scope of a channel.

* `private`: Channel is only visible to invited members (e.g., private Slack channels)
* `workspace`: Channel is visible to all workspace members (e.g., public Slack channels)
* `external`: Channel is shared with external organizations (e.g., Slack Connect)
* `unknown`: Visibility cannot be determined

```typescript
type ChannelVisibility = "private" | "workspace" | "external" | "unknown"
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.