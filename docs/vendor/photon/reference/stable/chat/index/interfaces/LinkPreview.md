> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# LinkPreview

> A link found in a message, with optional unfurl metadata.

On the initial message event, only `url` is available (unfurl metadata
arrives later via `message_changed`). The `fetchMessage` callback is
provided when the URL points to another chat message on the same platform.

## Properties

<ResponseField name={"description"} type={"string"}>
  Description from unfurl metadata (if available)
</ResponseField>

<ResponseField name={"fetchMessage"} type={"() => Promise<Message<unknown>>"}>
  **Type:** <code>{"() => Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>"}</code>

  If this links to a chat message, fetch the full Message
</ResponseField>

<ResponseField name={"imageUrl"} type={"string"}>
  Preview image URL (if available)
</ResponseField>

<ResponseField name={"siteName"} type={"string"}>
  Site name (e.g., "Vercel")
</ResponseField>

<ResponseField name={"title"} type={"string"}>
  Title from unfurl metadata (if available)
</ResponseField>

<ResponseField name={"url"} type={"string"} required>
  The URL
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.