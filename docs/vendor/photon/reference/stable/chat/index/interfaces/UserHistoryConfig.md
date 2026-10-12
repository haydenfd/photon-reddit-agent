> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# UserHistoryConfig

> Configuration for cross-platform per-user history.

Configuration for cross-platform per-user history.
Replaces the top-level `transcripts` config field.

Set `UserHistoryConfig.identity` here, or continue using the
deprecated top-level `ChatConfig.identity` during migration.

## Properties

<ResponseField name={"identity"} type={"IdentityResolver"} typeHref={"/reference/stable/chat/index/types/IdentityResolver"}>
  Resolves a stable cross-platform user key from inbound messages.
  Preferred location for the identity resolver when using `history.user`.
  If omitted, `ChatConfig.identity` is used as a migration fallback.
  One of the two must be set when user history is enabled.
</ResponseField>

<ResponseField name={"maxPerUser"} type={"number | false"}>
  Hard cap; older entries evicted on append. Default 200. Set false for no cap.
</ResponseField>

<ResponseField name={"retention"} type={"number | string | string | string | string"}>
  Default retention applied as the list TTL. Refreshed on every append.
  Omit for no expiry.
</ResponseField>

<ResponseField name={"storeFormatted"} type={"boolean"}>
  Persist `formatted` (mdast AST). Default false.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.