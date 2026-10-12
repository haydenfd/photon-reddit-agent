> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ModalSubmitEvent

> Event emitted when a user submits a modal form.

## Properties

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required>
  The adapter that received this event
</ResponseField>

<ResponseField name={"callbackId"} type={"string"} required>
  The callback ID specified when creating the modal
</ResponseField>

<ResponseField name={"privateMetadata"} type={"string"}>
  The private metadata string set when the modal was created.
  Use this to pass arbitrary context (e.g., JSON) through the modal lifecycle.
</ResponseField>

<ResponseField name={"raw"} type={"unknown"} required>
  Raw platform-specific payload
</ResponseField>

<ResponseField name={"relatedChannel"} type={"Channel<Record<string, unknown>, TRawMessage>"}>
  **Type:** <code>[Channel](/docs/reference/stable/chat/index/interfaces/Channel){"<Record<string, unknown>, TRawMessage>"}</code>

  The channel where the modal was originally triggered from.
  Available when the modal was opened via SlashCommandEvent.openModal().
</ResponseField>

<ResponseField name={"relatedMessage"} type={"SentMessage<TRawMessage>"}>
  **Type:** <code>[SentMessage](/docs/reference/stable/chat/index/interfaces/SentMessage){"<TRawMessage>"}</code>

  The message that contained the action which opened the modal.
  Available when the modal was opened from a message action via ActionEvent.openModal().
  This is a SentMessage with edit/delete capabilities.
</ResponseField>

<ResponseField name={"relatedThread"} type={"Thread<Record<string, unknown>, TRawMessage>"}>
  **Type:** <code>[Thread](/docs/reference/stable/chat/index/interfaces/Thread){"<Record<string, unknown>, TRawMessage>"}</code>

  The thread where the modal was originally triggered from.
  Available when the modal was opened via ActionEvent.openModal().
</ResponseField>

<ResponseField name={"user"} type={"Author"} typeHref={"/reference/stable/chat/index/interfaces/Author"} required>
  The user who submitted the modal
</ResponseField>

<ResponseField name={"values"} type={"Record<string, string>"} required>
  Form field values keyed by input ID
</ResponseField>

<ResponseField name={"viewId"} type={"string"} required>
  Platform-specific view/dialog ID
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.