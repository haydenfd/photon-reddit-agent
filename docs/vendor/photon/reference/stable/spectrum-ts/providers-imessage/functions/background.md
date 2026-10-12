> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# background

```typescript
background(input: "clear"): ContentBuilder
```

Set or clear the chat background. iMessage-only, remote-only.

* `background("clear")` — remove the current chat background.
* `background("./photo.jpg")` — set background from a filesystem path.
  MIME type is inferred from the extension; override with `options.mimeType`.
* `background(new URL("https://…/photo.jpg"))` — fetch the background
  lazily over the network. Bytes stay in memory (safe in read-only
  environments). MIME type is inferred from the URL pathname extension;
  override with `options.mimeType` when the URL has no usable extension.
* `background(buffer, { mimeType })` — set background from in-memory bytes.
  `options.mimeType` is required.

`"clear"` is a reserved string-literal sentinel. If you have a file literally
named `clear` with no extension, pass `"./clear"` or load it as a Buffer.

`space.send(background(...))` is the canonical form; `space.background(...)`
is sugar attached via `PlatformDef.space.actions` (only typed on
`PlatformSpace<IMessageDef>`).

`Background` is intentionally not a member of the universal `Content`
union — the `as unknown as Content` cast keeps the builder shape compatible
with the framework's `ContentBuilder.build(): Promise<Content>` signature.
The framework treats it as a fire-and-forget control signal at runtime.

## Parameters

<ResponseField name={"input"} type={"\"clear\""} required />

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>

```typescript
background(input: string | Buffer<ArrayBufferLike> | URL, options?: { mimeType: string }): ContentBuilder
```

Set or clear the chat background. iMessage-only, remote-only.

* `background("clear")` — remove the current chat background.
* `background("./photo.jpg")` — set background from a filesystem path.
  MIME type is inferred from the extension; override with `options.mimeType`.
* `background(new URL("https://…/photo.jpg"))` — fetch the background
  lazily over the network. Bytes stay in memory (safe in read-only
  environments). MIME type is inferred from the URL pathname extension;
  override with `options.mimeType` when the URL has no usable extension.
* `background(buffer, { mimeType })` — set background from in-memory bytes.
  `options.mimeType` is required.

`"clear"` is a reserved string-literal sentinel. If you have a file literally
named `clear` with no extension, pass `"./clear"` or load it as a Buffer.

`space.send(background(...))` is the canonical form; `space.background(...)`
is sugar attached via `PlatformDef.space.actions` (only typed on
`PlatformSpace<IMessageDef>`).

`Background` is intentionally not a member of the universal `Content`
union — the `as unknown as Content` cast keeps the builder shape compatible
with the framework's `ContentBuilder.build(): Promise<Content>` signature.
The framework treats it as a fire-and-forget control signal at runtime.

## Parameters

<ResponseField name={"input"} type={"string | Buffer<ArrayBufferLike> | URL"} required />

<ResponseField name={"options"} type={"{ mimeType: string }"} />

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.