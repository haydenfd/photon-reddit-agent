> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# StreamingMarkdownRenderer

> A streaming markdown renderer that buffers potential table headers until confirmed by a separator line, preventing tables from flashing as raw pipe-delimited t…

A streaming markdown renderer that buffers potential table headers
until confirmed by a separator line, preventing tables from flashing
as raw pipe-delimited text during LLM streaming.

Outputs markdown (not platform text). Format conversion still happens
in the adapter's editMessage → renderPostable → fromAst pipeline.

## Constructor

```typescript
StreamingMarkdownRenderer(options?: StreamingMarkdownRendererOptions): StreamingMarkdownRenderer
```

### Parameters

<ResponseField name={"options"} type={"StreamingMarkdownRendererOptions"} />

### Returns

<code>[StreamingMarkdownRenderer](/docs/reference/stable/chat/index/classes/StreamingMarkdownRenderer)</code>

## Methods

### finish()

```typescript
finish(): string
```

Signal stream end. Flushes held-back lines. Returns final render.

#### Returns

`string`

### getCommittableText()

```typescript
getCommittableText(): string
```

Get text safe for append-only streaming (e.g. Slack native streaming).

* Holds back unconfirmed table headers until separator arrives.
* Optionally wraps confirmed tables in code fences so pipes render as
  literal text on append-only surfaces that lack native table support.
  The code fence is left OPEN while the table is still streaming,
  keeping output monotonic for deltas.
* Holds back unclosed inline markers (\*\*, \*, \~\~, \`, \[).
* The final editMessage replaces everything with properly formatted text.

#### Returns

`string`

### getText()

```typescript
getText(): string
```

Raw accumulated text (no remend, no buffering). For the final edit.

#### Returns

`string`

### push()

```typescript
push(chunk: string): void
```

Append a chunk from the LLM stream.

#### Parameters

<ResponseField name={"chunk"} type={"string"} required />

### render()

```typescript
render(): string
```

Get renderable markdown for an intermediate edit.

* Holds back trailing lines that look like a table header (|...|)
  until a separator line (|---|---|) confirms or the next line denies.
* Applies remend() to close incomplete inline markers.
* Idempotent: returns cached result if no push() since last call.

#### Returns

`string`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.