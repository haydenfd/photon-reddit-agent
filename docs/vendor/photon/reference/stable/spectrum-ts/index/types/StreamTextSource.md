> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# StreamTextSource

> Anything the stream overloads of and accept as a source.

Anything the stream overloads of `text()` and `markdown()` accept as a
source. The builder normalizes all of these to an internal
`AsyncIterable<string>` of text deltas:

* the Vercel AI SDK `streamText()` result (its `.textStream` is picked up
  automatically — pass either the whole result or `.textStream` directly),
* a raw `AsyncIterable<T>` (e.g. an OpenAI / Anthropic streaming response),
* a raw `ReadableStream<T>` of chunks.

```typescript
type StreamTextSource = { textStream: AsyncIterable<string> | ReadableStream<string> } | AsyncIterable<T> | ReadableStream<T>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.