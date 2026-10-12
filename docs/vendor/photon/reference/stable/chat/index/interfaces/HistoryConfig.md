> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# HistoryConfig

> Unified history configuration block.

Unified history configuration block. Supersedes the individual
`transcripts`, `threadHistory`, and `messageHistory` fields on [ChatConfig](/docs/reference/stable/chat/index/interfaces/ChatConfig).

## Properties

<ResponseField name={"thread"} type={"{ maxMessages: number; ttlMs: number }"}>
  Per-thread message history backfill.
  Used by adapters that set `persistThreadHistory: true` (e.g. Telegram, WhatsApp).
  Replaces the top-level `threadHistory` / `messageHistory` config fields.
</ResponseField>

<ResponseField name={"user"} type={"UserHistoryConfig"} typeHref={"/reference/stable/chat/index/interfaces/UserHistoryConfig"}>
  Cross-platform per-user message persistence.
  Replaces the top-level `transcripts` config field.
  Requires an identity resolver via `UserHistoryConfig.identity`
  (preferred) or the deprecated top-level `ChatConfig.identity`.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.