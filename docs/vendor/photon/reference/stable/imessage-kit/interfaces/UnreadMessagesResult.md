> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# UnreadMessagesResult

> Unread messages result Contains unread messages grouped by sender with statistics

Unread messages result

Contains unread messages grouped by sender with statistics

## Properties

<ResponseField name={"groups"} type={"readonly { messages: readonly Message[]; sender: string }[]"} required>
  **Type:** <code>{"readonly { messages: readonly "}[Message](/docs/reference/stable/imessage-kit/interfaces/Message){"[]; sender: string }[]"}</code>

  Messages grouped by sender
</ResponseField>

<ResponseField name={"senderCount"} type={"number"} required>
  Number of unique senders
</ResponseField>

<ResponseField name={"total"} type={"number"} required>
  Total number of unread messages
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.