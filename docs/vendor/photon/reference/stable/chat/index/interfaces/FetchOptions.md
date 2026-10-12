> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# FetchOptions

> Options for fetching messages from a thread.

## Properties

<ResponseField name={"cursor"} type={"string"}>
  Pagination cursor for fetching the next page of messages.
  Pass the `nextCursor` from a previous `FetchResult`.
</ResponseField>

<ResponseField name={"direction"} type={"FetchDirection"} typeHref={"/reference/stable/chat/index/types/FetchDirection"}>
  Direction to fetch messages.

  * `backward` (default): Fetch most recent messages. Cursor moves to older messages.
  * `forward`: Fetch oldest messages. Cursor moves to newer messages.

  Messages within each page are always returned in chronological order (oldest first).
</ResponseField>

<ResponseField name={"limit"} type={"number"}>
  Maximum number of messages to fetch. Default varies by adapter (50-100).
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.