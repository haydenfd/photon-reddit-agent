> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Groups

> Bundle multiple messages into one logical visual group.

Use `group()` to bundle multiple messages into one logical unit, such as an album of images or a multi-attachment reply.

Each item is delivered as its own [Message](/docs/reference/stable/spectrum-ts/symbols/message) envelope, but the items ship together so the receiving platform can render them as a single visual group when supported.

```ts theme={null}
import { group, attachment } from "spectrum-ts";

await space.send(group(
  attachment("/path/to/photo-1.jpg"),
  attachment("/path/to/photo-2.jpg"),
  attachment("/path/to/photo-3.jpg"),
));
```

Groups don't nest, and reactions can't be group members. The builder enforces both at construction time. Platforms that don't support grouping fall back to sending each item sequentially.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.