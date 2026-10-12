> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# fromFullStream

```typescript
fromFullStream(stream: AsyncIterable<unknown>): AsyncIterable<string | StreamChunk>
```

Normalizes an async iterable stream for use with `thread.post()`.

Handles these stream types automatically:

* **Text streams** (`AsyncIterable<string>`, e.g. AI SDK `textStream`) —
  passed through as-is.
* **AI SDK full streams** (`AsyncIterable<object>`, e.g. `result.fullStream`) —
  extracts `text-delta` events and injects `"\n\n"` separators after each
  `finish-step` so that multi-step agent output reads naturally.
* **TanStack AI / AG-UI streams** (`AsyncIterable<StreamChunk>` from
  `chat()`) — extracts `TEXT_MESSAGE_CONTENT` deltas and injects `"\n\n"`
  separators after each `TEXT_MESSAGE_END`, since every model turn in the
  tool loop is its own text message.
* **StreamChunk objects** (`task_update`, `plan_update`, `markdown_text`) —
  passed through as-is for adapters with native structured chunk support.

This is used internally by `thread.post()`, so you can pass any of these
streams directly:

```ts
await thread.post(result.fullStream); // AI SDK, auto-detected
await thread.post(result.textStream); // AI SDK text only
await thread.post(chat({ adapter, messages })); // TanStack AI
```

## Parameters

<ResponseField name={"stream"} type={"AsyncIterable<unknown>"} required />

## Returns

<code>{"AsyncIterable<string | "}[StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk){">"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.