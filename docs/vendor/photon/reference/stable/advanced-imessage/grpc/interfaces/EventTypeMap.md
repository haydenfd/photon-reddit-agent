> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# EventTypeMap

## Properties

<ResponseField name={"chat.archived"} type={"EventContext & { sequence: number; type: \"chat.archived\" }"} required />

<ResponseField name={"chat.backgroundChanged"} type={"EventContext & { sequence: number; type: \"chat.backgroundChanged\" }"} required />

<ResponseField name={"chat.backgroundRemoved"} type={"EventContext & { sequence: number; type: \"chat.backgroundRemoved\" }"} required />

<ResponseField name={"chat.markedRead"} type={"EventContext & { sequence: number; type: \"chat.markedRead\" }"} required />

<ResponseField name={"chat.unarchived"} type={"EventContext & { sequence: number; type: \"chat.unarchived\" }"} required />

<ResponseField name={"group.changed"} type={"GroupEvent"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/GroupEvent"} required />

<ResponseField name={"message.edited"} type={"EventContext & { content: MessageContent; editedAt: Date; messageGuid: string; …"} required>
  **Type:** <code>{"EventContext & { content: "}[MessageContent](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessageContent){"; editedAt: Date; messageGuid: string; sequence: number; type: \"message.edited\" }"}</code>
</ResponseField>

<ResponseField name={"message.reactionAdded"} type={"EventContext & { messageGuid: string; reaction: MessageReaction; sequence: numb…"} required>
  **Type:** <code>{"EventContext & { messageGuid: string; reaction: "}[MessageReaction](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessageReaction){"; sequence: number; targetPartIndex: number; type: \"message.reactionAdded\" }"}</code>
</ResponseField>

<ResponseField name={"message.reactionRemoved"} type={"EventContext & { messageGuid: string; reaction: MessageReaction; sequence: numb…"} required>
  **Type:** <code>{"EventContext & { messageGuid: string; reaction: "}[MessageReaction](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessageReaction){"; sequence: number; targetPartIndex: number; type: \"message.reactionRemoved\" }"}</code>
</ResponseField>

<ResponseField name={"message.read"} type={"EventContext & { messageGuid: string; readAt: Date; sequence: number; type: \"me…"} required />

<ResponseField name={"message.received"} type={"EventContext & { message: Message; sequence: number; type: \"message.received\" }"} required>
  **Type:** <code>{"EventContext & { message: "}[Message](/docs/reference/stable/advanced-imessage/grpc/interfaces/Message){"; sequence: number; type: \"message.received\" }"}</code>
</ResponseField>

<ResponseField name={"message.stickerPlaced"} type={"EventContext & { messageGuid: string; placement: StickerPlacement; sequence: nu…"} required>
  **Type:** <code>{"EventContext & { messageGuid: string; placement: "}[StickerPlacement](/docs/reference/stable/advanced-imessage/grpc/interfaces/StickerPlacement){"; sequence: number; sticker: "}[AttachmentInfo](/docs/reference/stable/advanced-imessage/grpc/interfaces/AttachmentInfo){"; targetPartIndex: number; type: \"message.stickerPlaced\" }"}</code>
</ResponseField>

<ResponseField name={"message.unsent"} type={"EventContext & { messageGuid: string; retractedAt: Date; sequence: number; type…"} required />

<ResponseField name={"poll.changed"} type={"PollEvent"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/PollEvent"} required />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.