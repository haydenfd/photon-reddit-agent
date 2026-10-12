> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# FetchResult

> Result of fetching messages from a thread.

## Properties

<ResponseField name={"messages"} type={"Message<TRawMessage>[]"} required>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>[]"}</code>

  Messages in chronological order (oldest first within this page).

  For `direction: 'backward'` (default): These are the N most recent messages.
  For `direction: 'forward'`: These are the N oldest messages (or next N after cursor).
</ResponseField>

<ResponseField name={"nextCursor"} type={"string"}>
  Cursor for fetching the next page.
  Pass this as `cursor` in the next `fetchMessages` call.

  * For `direction: 'backward'`: Points to older messages.
  * For `direction: 'forward'`: Points to newer messages.

  Undefined if there are no more messages in that direction.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.