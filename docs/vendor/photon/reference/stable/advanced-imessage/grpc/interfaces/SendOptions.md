> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# SendOptions

## Properties

<ResponseField name={"clientMessageId"} type={"string"}>
  Stable idempotency key for this logical send.
</ResponseField>

<ResponseField name={"effect"} type={"MessageEffect"} typeHref={"/reference/stable/advanced-imessage/grpc/types/MessageEffect"}>
  Full-screen or bubble effect to apply to the outgoing message.
</ResponseField>

<ResponseField name={"enableDataDetection"} type={"boolean"}>
  Enable Apple's data-detector pass for links, dates, addresses, and similar text.
</ResponseField>

<ResponseField name={"enableLinkPreview"} type={"boolean"}>
  Ask Messages to generate rich URL previews when possible.
</ResponseField>

<ResponseField name={"formatting"} type={"readonly TextFormatInput[]"}>
  **Type:** <code>{"readonly "}[TextFormatInput](/docs/reference/stable/advanced-imessage/grpc/types/TextFormatInput){"[]"}</code>

  UTF-16 ranges for bold, italic, underline, strikethrough, or text effects.
</ResponseField>

<ResponseField name={"replyTo"} type={"string | { guid: string; partIndex: number }"}>
  Message guid, or message guid plus multipart bubble index, to reply to.
</ResponseField>

<ResponseField name={"subject"} type={"string"}>
  Optional subject line for the outgoing message.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.