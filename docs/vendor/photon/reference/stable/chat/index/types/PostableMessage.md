> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# PostableMessage

> A message that can be posted to a thread.

* `string` - Raw text, passed through as-is to the platform
* `{ raw: string }` - Explicit raw text, passed through as-is
* `{ markdown: string }` - Markdown text, converted to platform format
* `{ ast: Root }` - mdast AST, converted to platform format
* `{ card: CardElement }` - Rich card with buttons (Block Kit / Adaptive Cards / GChat Cards)
* `CardElement` - Direct card element
* `AsyncIterable<string>` - Streaming text (e.g., from AI SDK's textStream)
* `AsyncIterable<string | StreamEvent>` - AI SDK fullStream or TanStack AI `chat()` stream (auto-detected, extracts text with step separators)

```typescript
type PostableMessage = AdapterPostableMessage | AsyncIterable<string | StreamChunk | StreamEvent> | PostableObject
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.