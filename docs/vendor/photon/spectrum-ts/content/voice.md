> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Voice

> Send voice notes with audio metadata and provider fallbacks.

Use `voice()` to send a voice note. It uses the same input shape as `attachment`: a path, a `URL`, or a `Buffer` plus optional metadata.

<Note>
  This page covers audio clips sent inside messages. To place or receive a live
  call, see [Voice calls over SIP](/docs/spectrum-ts/providers/voice).
</Note>

```ts theme={null}
import { voice } from "spectrum-ts";

// From a file path
await space.send(voice("/path/to/note.m4a"));

// From a buffer - duration in seconds is optional but useful for waveform UIs
await space.send(voice(buffer, {
  name: "note.m4a",
  mimeType: "audio/mp4",
  duration: 12,
}));
```

Platforms that don't support voice notes typically downgrade to a regular audio attachment. If the MIME type can't be inferred and `options.mimeType` is omitted, the builder throws at send time.

<Accordion title="Voice" description="Resolved voice content delivered alongside the message.">
  | Field | Type | Description |
  | - | - | - |
  | `mimeType` | `string` | The audio MIME type, such as `audio/mp4`. |
  | `name` | `string` (optional) | Filename for the underlying clip. |
  | `duration` | `number` (optional) | Length in seconds. |
  | `size` | `number` (optional) | Byte length, when known up front. |
  | `read()` | `() => Promise<Buffer>` | Materialize the bytes. |
  | `stream()` | `() => Promise<ReadableStream>` | Stream the bytes. Prefer this for large clips. |
</Accordion>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.