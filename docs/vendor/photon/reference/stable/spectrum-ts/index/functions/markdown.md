> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# markdown

```typescript
markdown(source: string): ContentBuilder
```

Send styled text written in standard markdown — a static string or a
streaming LLM response.

* `markdown("**hi**")` sends the markdown as one message.
* `markdown(source)` marks a text stream as markdown: platforms with native
  support stream it styled (Telegram renders drafts and the final message
  via `parse_mode`), and everywhere else the accumulated text falls back
  through the markdown chain instead of surfacing raw `**` markers.

Stream sources and options work exactly as in `text()` — any SDK streaming
result or `AsyncIterable` / `ReadableStream`, with `options.extract` for
unrecognized chunk shapes.

## Parameters

<ResponseField name={"source"} type={"string"} required />

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>

```typescript
markdown(source: StreamTextSource<T>, options?: TextStreamOptions<T>): ContentBuilder
```

Send styled text written in standard markdown — a static string or a
streaming LLM response.

* `markdown("**hi**")` sends the markdown as one message.
* `markdown(source)` marks a text stream as markdown: platforms with native
  support stream it styled (Telegram renders drafts and the final message
  via `parse_mode`), and everywhere else the accumulated text falls back
  through the markdown chain instead of surfacing raw `**` markers.

Stream sources and options work exactly as in `text()` — any SDK streaming
result or `AsyncIterable` / `ReadableStream`, with `options.extract` for
unrecognized chunk shapes.

## Parameters

<ResponseField name={"source"} type={"StreamTextSource<T>"} required>
  **Type:** <code>[StreamTextSource](/docs/reference/stable/spectrum-ts/index/types/StreamTextSource){"<T>"}</code>
</ResponseField>

<ResponseField name={"options"} type={"TextStreamOptions<T>"}>
  **Type:** <code>[TextStreamOptions](/docs/reference/stable/spectrum-ts/index/interfaces/TextStreamOptions){"<T>"}</code>
</ResponseField>

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.