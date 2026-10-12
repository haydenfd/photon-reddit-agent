> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# parseMessageChangeEvent

```typescript
parseMessageChangeEvent(json: unknown, sequence: number): MessageEvent | undefined
```

Parse proto3-JSON `photon.imessage.v1.*ChangeEvent` payloads into the
SDK's public event types.

Inbound events no longer stream through this client (they ride Fusor);
they arrive as proto3-JSON bodies inside delivery envelopes. These
helpers are the single source of truth for decoding them: the generated
codecs own the wire conventions (camelCase fields, RFC3339 timestamps →
`Date`, enum names, base64 bytes) and the same mappers the old streaming
transport used produce the public shapes — so consumers never hand-write
a schema for the event graph.

`sequence` is the envelope's per-line sequence, stamped onto the event
exactly as the streaming plane once did.

Returns `undefined` when the payload decodes but carries no change this
SDK version recognizes (e.g. a newer server's new event variant) —
callers should skip those, not throw. A structurally invalid payload
(wrong field types, malformed timestamps) throws.

## Parameters

<ResponseField name={"json"} type={"unknown"} required />

<ResponseField name={"sequence"} type={"number"} required />

## Returns

<code>[MessageEvent](/docs/reference/stable/advanced-imessage/grpc/types/MessageEvent){" | undefined"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.