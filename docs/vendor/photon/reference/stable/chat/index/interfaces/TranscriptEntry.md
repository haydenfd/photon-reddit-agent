> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# TranscriptEntry

## Properties

<ResponseField name={"formatted"} type={"Root"} typeHref={"/reference/stable/chat/index/interfaces/Root"}>
  mdast AST. Only present when `transcripts.storeFormatted` is true.
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  UUID assigned by the SDK at append time. Opaque — not lexicographically
  sortable. Entries are returned by `list()` in append order (the underlying
  list semantics of `state.appendToList`); use `timestamp` to reason about
  ordering across stores.
</ResponseField>

<ResponseField name={"platform"} type={"string"} required>
  Originating adapter name.
</ResponseField>

<ResponseField name={"platformMessageId"} type={"string"}>
  Platform-native message ID, when known.
</ResponseField>

<ResponseField name={"role"} type={"TranscriptRole"} typeHref={"/reference/stable/chat/index/types/TranscriptRole"} required />

<ResponseField name={"text"} type={"string"} required>
  Plain-text body — canonical field for prompt building.
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required>
  Originating thread ID.
</ResponseField>

<ResponseField name={"timestamp"} type={"number"} required>
  ms-since-epoch, set at append time on the SDK side.
</ResponseField>

<ResponseField name={"userKey"} type={"string"} required>
  Cross-platform user key from the IdentityResolver.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.