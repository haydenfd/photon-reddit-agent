> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageListFilter

> Filter + paging knobs shared by and .

Filter + paging knobs shared by `messages.listRecent` and `messages.listInChat`.

Note: `chatGuid` is *not* on this type. `listInChat` takes it as its own
required argument so the type system rejects calling `listRecent({ chatGuid })`
(which the server silently ignores).

## Properties

<ResponseField name={"after"} type={"Date"}>
  Return messages created after this time.
</ResponseField>

<ResponseField name={"before"} type={"Date"}>
  Return messages created before this time.
</ResponseField>

<ResponseField name={"isFromMe"} type={"boolean"}>
  Limit results to outgoing (`true`) or incoming (`false`) messages.
</ResponseField>

<ResponseField name={"isRead"} type={"boolean"}>
  Limit results to read (`true`) or unread (`false`) messages.
</ResponseField>

<ResponseField name={"pageSize"} type={"number"}>
  Number of messages per page. The server currently requires `1..100`.
</ResponseField>

<ResponseField name={"pageToken"} type={"string"}>
  Token returned by the previous page.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.