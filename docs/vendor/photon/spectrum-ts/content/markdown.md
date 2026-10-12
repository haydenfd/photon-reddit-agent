> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Markdown

> Send styled text that renders through each provider's native formatting model.

Use `markdown()` when you want to send styled text written in standard markdown. Spectrum supports CommonMark plus GFM tables and strikethrough.

Each platform renders markdown to its native format. Telegram uses `parse_mode: "HTML"`. iMessage in remote mode uses UTF-16 styled text formatting ranges. Platforms without native markdown support receive readable plain text through the send pipeline's automatic fallback.

```ts theme={null}
import { markdown } from "spectrum-ts";

await space.send(markdown("**Bold** and _italic_ text."));
```

## Streaming markdown

`markdown()` accepts a [StreamTextSource](/docs/reference/stable/spectrum-ts/symbols/streamtextsource), just like `text()`. Markdown streams render progressively on platforms with native support. Everywhere else, the accumulated text falls back through the markdown pipeline instead of surfacing raw `**` markers.

```ts theme={null}
import { markdown } from "spectrum-ts";
import { streamText as aiStreamText } from "ai";

const result = aiStreamText({ model, prompt: message.content.text });
await space.send(markdown(result));
```

Markdown is outbound-only by design. Inbound messages always surface as `text` content regardless of platform formatting.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.