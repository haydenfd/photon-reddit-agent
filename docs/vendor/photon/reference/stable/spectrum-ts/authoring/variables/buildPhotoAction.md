> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# buildPhotoAction

> Convert a photo-content input into the discriminated shape.

Convert a photo-content input into the discriminated `PhotoAction` shape.

* `"clear"` → `{ kind: "clear" }` (reserved sentinel — to send a literal
  file named `clear`, pass `"./clear"` or load it as a `Buffer`).
* `string` path → reads the file lazily via `node:fs/promises.readFile`;
  MIME type inferred from the filename extension.
* `URL` → fetched lazily over the network into memory; never touches the
  filesystem, so it works in read-only environments. MIME type is inferred
  from the URL pathname extension at build time (override with
  `options.mimeType` if the URL has no usable extension).
* `Buffer` → in-memory bytes; `options.mimeType` is required.

Called at builder-construction time so a missing MIME type fails fast
rather than at send time. The returned `read()` is memoized so repeated
`build()` / send cycles don't re-read the same file.

```typescript
const buildPhotoAction: (input: PhotoInput, options: { mimeType: string } | undefined, contentLabel: string) => PhotoAction
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.