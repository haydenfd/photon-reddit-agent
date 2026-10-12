> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# text

```typescript
text(source: string): ContentBuilder
```

Send plain text — a static string or a streaming LLM response.

`text("hi")` sends one message. `text(source)` wraps a text stream so it
can be sent like any other content; delivery is platform-specific —
iMessage (remote) sends the first chunk as a real message and then edits it
in place as more text arrives; Telegram (private chats) animates a native
draft preview and persists the final text as one message. Platforms that
can't stream wait for the stream to finish and deliver the accumulated text
as one plain message.

A stream source accepts whatever the popular SDKs return (the AI SDK
`streamText()` result, OpenAI / Anthropic streaming responses, or any
`AsyncIterable` / `ReadableStream`); pass `options.extract` for any chunk
shape the built-in detection doesn't recognize. A stream can only be sent
once. Options apply to stream sources only — they are ignored for strings.

For text written in markdown, use `markdown()` instead.

## Parameters

<ResponseField name={"source"} type={"string"} required />

## Returns

<code>[ContentBuilder](/docs/reference/stable/spectrum-ts/index/interfaces/ContentBuilder)</code>

```typescript
text(source: StreamTextSource<T>, options?: TextStreamOptions<T>): ContentBuilder
```

Send plain text — a static string or a streaming LLM response.

`text("hi")` sends one message. `text(source)` wraps a text stream so it
can be sent like any other content; delivery is platform-specific —
iMessage (remote) sends the first chunk as a real message and then edits it
in place as more text arrives; Telegram (private chats) animates a native
draft preview and persists the final text as one message. Platforms that
can't stream wait for the stream to finish and deliver the accumulated text
as one plain message.

A stream source accepts whatever the popular SDKs return (the AI SDK
`streamText()` result, OpenAI / Anthropic streaming responses, or any
`AsyncIterable` / `ReadableStream`); pass `options.extract` for any chunk
shape the built-in detection doesn't recognize. A stream can only be sent
once. Options apply to stream sources only — they are ignored for strings.

For text written in markdown, use `markdown()` instead.

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