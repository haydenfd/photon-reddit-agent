> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# StreamEvent

> Duck-typed stream event compatible with AI SDK's and with AG-UI protocol streams such as TanStack AI's .

Duck-typed stream event compatible with AI SDK's `fullStream` and with
AG-UI protocol streams such as TanStack AI's `chat()`.

* `text-delta` (AI SDK) and `TEXT_MESSAGE_CONTENT` (AG-UI) events are extracted as text output.
* `finish-step` (AI SDK) and `TEXT_MESSAGE_END` (AG-UI) events trigger paragraph separators between steps.
* All other event types (tool calls, tool results, run lifecycle, reasoning, etc.) are silently skipped.

```typescript
type StreamEvent = { textDelta: string; type: "text-delta" } | { text: string; type: "text-delta" } | { type: "finish-step" } | { delta: string; messageId: string; type: "TEXT_MESSAGE_CONTENT" } | { messageId: string; type: "TEXT_MESSAGE_END" } | { type: string }
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.