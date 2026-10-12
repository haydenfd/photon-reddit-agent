> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Text

> Send plain text and stream text through Spectrum.

Use `text()` for plain outbound text. You can also pass a plain string anywhere Spectrum accepts content.

```ts theme={null}
import { text } from "spectrum-ts";

await space.send(text("Hello, world."));

// Plain strings are equivalent:
await space.send("Hello, world.");
```

## Streaming text

Both `text()` and `markdown()` accept a [StreamTextSource](/docs/reference/stable/spectrum-ts/symbols/streamtextsource): an AI SDK result, an `AsyncIterable`, or a `ReadableStream`.

On platforms that support it, text streams live. iMessage in remote mode sends the first chunk as a real message and edits in place as more text arrives. Telegram private chats animate a native draft preview. Platforms without streaming support wait for the stream to finish and send the full text as one message.

<Tabs>
  <Tab title="Vercel AI SDK">
    ```ts theme={null}
    import { text } from "spectrum-ts";
    import { streamText as aiStreamText } from "ai";

    const result = aiStreamText({ model, prompt: message.content.text });
    await space.send(text(result));
    ```
  </Tab>

  <Tab title="AsyncIterable">
    ```ts theme={null}
    import { text } from "spectrum-ts";

    async function* generate() {
      yield "Hello, ";
      yield "world!";
    }

    await space.send(text(generate()));
    ```
  </Tab>

  <Tab title="Custom extractor">
    ```ts theme={null}
    import { text } from "spectrum-ts";

    await space.send(
      text(customStream, {
        extract: (chunk) => chunk.delta?.text ?? null,
      }),
    );
    ```
  </Tab>
</Tabs>

A stream can only be sent once.

<Accordion title="TextStreamOptions">
  [TextStreamOptions reference](/docs/reference/stable/spectrum-ts/symbols/textstreamoptions)
</Accordion>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.