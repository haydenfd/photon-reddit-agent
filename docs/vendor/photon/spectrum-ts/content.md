> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Content

> Build every outbound message shape with Spectrum content builders.

Spectrum exposes a family of content builders for text, markdown, attachments, rich previews, replies, edits, typing indicators, chat metadata, and provider-specific payloads. Any API that takes a [ContentInput](/docs/reference/stable/spectrum-ts/symbols/contentinput) accepts a plain string or a [ContentBuilder](/docs/reference/stable/spectrum-ts/symbols/contentbuilder).

Use this section when you need to choose the right outbound content shape or understand how a builder degrades across providers.

<CardGroup cols={2}>
  <Card title="Text" icon="message-square-text" href="/docs/spectrum-ts/content/text">
    Send plain text and stream generated text into supported providers.
  </Card>

  <Card title="Markdown" icon="pilcrow" href="/docs/spectrum-ts/content/markdown">
    Send styled text that renders through each provider's native formatting model.
  </Card>

  <Card title="Attachments" icon="paperclip" href="/docs/spectrum-ts/content/attachments">
    Send files from paths, URLs, or buffers with stable attachment IDs.
  </Card>

  <Card title="Voice" icon="audio-lines" href="/docs/spectrum-ts/content/voice">
    Send voice notes with audio metadata and provider fallbacks.
  </Card>

  <Card title="Contacts" icon="contact" href="/docs/spectrum-ts/content/contacts">
    Share contact cards from structured data, users, or vCards.
  </Card>

  <Card title="Rich links" icon="link" href="/docs/spectrum-ts/content/rich-links">
    Let each platform render URLs with its native preview behavior.
  </Card>

  <Card title="App link cards" icon="panel-top" href="/docs/spectrum-ts/content/app">
    Present URLs as tappable app-style cards where providers support them.
  </Card>

  <Card title="Polls" icon="list-checks" href="/docs/spectrum-ts/content/polls">
    Send poll prompts and receive selected options as content.
  </Card>

  <Card title="Groups" icon="images" href="/docs/spectrum-ts/content/groups">
    Bundle multiple messages into one logical visual group.
  </Card>

  <Card title="Custom content" icon="braces" href="/docs/spectrum-ts/content/custom">
    Send provider-specific structured payloads.
  </Card>

  <Card title="Replies" icon="reply" href="/docs/spectrum-ts/content/replies">
    Thread content under an existing message.
  </Card>

  <Card title="Edits" icon="square-pen" href="/docs/spectrum-ts/content/edits">
    Rewrite previously sent outbound messages.
  </Card>

  <Card title="Unsend" icon="undo-2" href="/docs/spectrum-ts/content/unsend">
    Retract a previously sent outbound message.
  </Card>

  <Card title="Typing indicators" icon="ellipsis" href="/docs/spectrum-ts/content/typing-indicators">
    Send start and stop typing signals.
  </Card>

  <Card title="Rename" icon="type" href="/docs/spectrum-ts/content/rename">
    Rename chats through the content pipeline.
  </Card>

  <Card title="Avatar" icon="image" href="/docs/spectrum-ts/content/avatar">
    Set or clear group chat avatars.
  </Card>

  <Card title="Membership" icon="users" href="/docs/spectrum-ts/content/membership">
    Add or remove group members and leave chats.
  </Card>

  <Card title="Composing content" icon="layers" href="/docs/spectrum-ts/content/composing-content">
    Send multiple content items or reply with multiple parts.
  </Card>
</CardGroup>

## Builder shortcut

Plain strings are equivalent to `text()`:

```ts theme={null}
await space.send("Hello, world.");
await space.send(text("Hello, world."));
```

Reach for an explicit builder when you need provider-aware behavior, structured metadata, or a content type that is not plain text.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.