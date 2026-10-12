> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Message

> Message object Represents a complete iMessage/SMS message

Message object

Represents a complete iMessage/SMS message

## Properties

<ResponseField name={"associatedMessageGuid"} type={"string | null"} required>
  GUID of the message this reaction is associated with (null if not a reaction)
</ResponseField>

<ResponseField name={"attachments"} type={"readonly Attachment[]"} required>
  **Type:** <code>{"readonly "}[Attachment](/docs/reference/stable/imessage-kit/interfaces/Attachment){"[]"}</code>

  List of attachments (readonly array)
</ResponseField>

<ResponseField name={"chatId"} type={"string"} required>
  ID of the chat this message belongs to
</ResponseField>

<ResponseField name={"date"} type={"Date"} required>
  Message sent/received time
</ResponseField>

<ResponseField name={"guid"} type={"string"} required>
  Globally unique identifier for the message
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Unique ID of the message in database
</ResponseField>

<ResponseField name={"isFromMe"} type={"boolean"} required>
  Whether the message is sent by me
</ResponseField>

<ResponseField name={"isGroupChat"} type={"boolean"} required>
  Whether this is a group chat message
</ResponseField>

<ResponseField name={"isReaction"} type={"boolean"} required>
  Whether this message is a tapback reaction
</ResponseField>

<ResponseField name={"isReactionRemoval"} type={"boolean"} required>
  Whether this is removing a reaction (vs adding)
</ResponseField>

<ResponseField name={"isRead"} type={"boolean"} required>
  Whether the message is read
</ResponseField>

<ResponseField name={"reactionType"} type={"ReactionType | null"} required>
  Type of reaction (null if not a reaction)
</ResponseField>

<ResponseField name={"sender"} type={"string"} required>
  Sender identifier (phone number or email)
</ResponseField>

<ResponseField name={"senderName"} type={"string | null"} required>
  Sender display name (may be null)
</ResponseField>

<ResponseField name={"service"} type={"ServiceType"} typeHref={"/reference/stable/imessage-kit/types/ServiceType"} required>
  Message service type
</ResponseField>

<ResponseField name={"text"} type={"string | null"} required>
  Message text content (null for non-text messages)
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.