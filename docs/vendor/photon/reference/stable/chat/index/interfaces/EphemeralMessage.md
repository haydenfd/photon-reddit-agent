> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# EphemeralMessage

> Result of posting an ephemeral message.

Ephemeral messages are visible only to a specific user and typically
cannot be edited or deleted (platform-dependent).

## Properties

<ResponseField name={"id"} type={"string"} required>
  Message ID (may be empty for some platforms)
</ResponseField>

<ResponseField name={"raw"} type={"TRawMessage"} required>
  Platform-specific raw response
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required>
  Thread ID where message was sent (or DM thread if fallback was used)
</ResponseField>

<ResponseField name={"usedFallback"} type={"boolean"} required>
  Whether this used native ephemeral or fell back to DM
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.