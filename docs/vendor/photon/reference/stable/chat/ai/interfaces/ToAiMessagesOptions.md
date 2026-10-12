> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ToAiMessagesOptions

> Options for converting messages to AI SDK format.

## Properties

<ResponseField name={"includeNames"} type={"boolean"}>
  When true, prefixes user messages with "\[username]: " for multi-user context
</ResponseField>

<ResponseField name={"onUnsupportedAttachment"} type={"(attachment: Attachment, message: Message) => void"}>
  **Type:** <code>{"(attachment: "}[Attachment](/docs/reference/stable/chat/index/interfaces/Attachment){", message: "}[Message](/docs/reference/stable/chat/index/classes/Message){") => void"}</code>

  Called when an attachment type is not supported (video, audio).
  Defaults to `console.warn`.
</ResponseField>

<ResponseField name={"transformMessage"} type={"(aiMessage: AiMessage, source: Message) => AiMessage | Promise<AiMessage | null…"}>
  **Type:** <code>{"(aiMessage: "}[AiMessage](/docs/reference/stable/chat/ai/types/AiMessage){", source: "}[Message](/docs/reference/stable/chat/index/classes/Message){") => "}[AiMessage](/docs/reference/stable/chat/ai/types/AiMessage){" | Promise<AiMessage | null> | null"}</code>

  Called for each message after default processing (text, links, attachments).
  Return the message (modified or as-is) to include it, or `null` to skip it.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.