> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# asApp

> Construct an content value.

Construct an `app` content value.

`url` is stored as a lazy accessor; `layout` is derived from the URL's Open
Graph / link metadata (title → caption, og:site\_name → image overlay,
description → subcaption, og:image → JPEG-transcoded image) using the same
machinery as `richlink`. A single metadata fetch is shared and memoized
across `url()` / `layout()`; fetch / parse failures resolve to a host-only
caption (no throw, no retry). Pass `options.layout` to supply an
already-decoded layout and skip the fetch entirely.

```typescript
const asApp: (url: AppUrl, options: AppOptions) => App
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.