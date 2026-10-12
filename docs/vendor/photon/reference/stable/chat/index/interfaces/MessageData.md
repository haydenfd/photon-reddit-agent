> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageData

> Input data for creating a Message instance.

Input data for creating a Message instance.
Use this interface when constructing Message objects.

## Properties

<ResponseField name={"attachments"} type={"Attachment[]"} required>
  **Type:** <code>[Attachment](/docs/reference/stable/chat/index/interfaces/Attachment){"[]"}</code>

  Attachments
</ResponseField>

<ResponseField name={"author"} type={"Author"} typeHref={"/reference/stable/chat/index/interfaces/Author"} required>
  Message author
</ResponseField>

<ResponseField name={"formatted"} type={"Root"} typeHref={"/reference/stable/chat/index/interfaces/Root"} required>
  Structured formatting as an AST (mdast Root)
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Unique message ID
</ResponseField>

<ResponseField name={"isMention"} type={"boolean"}>
  Whether the bot is @-mentioned in this message
</ResponseField>

<ResponseField name={"links"} type={"LinkPreview[]"}>
  **Type:** <code>[LinkPreview](/docs/reference/stable/chat/index/interfaces/LinkPreview){"[]"}</code>

  Links found in the message
</ResponseField>

<ResponseField name={"metadata"} type={"MessageMetadata"} typeHref={"/reference/stable/chat/index/interfaces/MessageMetadata"} required>
  Message metadata
</ResponseField>

<ResponseField name={"raw"} type={"TRawMessage"} required>
  Platform-specific raw payload (escape hatch)
</ResponseField>

<ResponseField name={"replyTo"} type={"Message<TRawMessage>"}>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

  Message this message replies to
</ResponseField>

<ResponseField name={"text"} type={"string"} required>
  Plain text content (all formatting stripped)
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required>
  Thread this message belongs to
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.