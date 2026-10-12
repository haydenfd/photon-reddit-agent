> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# AdapterEnvSpec

> Environment variables and constructor-only configuration for an adapter.

## Properties

<ResponseField name={"config"} type={"readonly string[]"}>
  Constructor options that have no environment-variable equivalent.
</ResponseField>

<ResponseField name={"credentialModes"} type={"readonly EnvGroup[]"}>
  **Type:** <code>{"readonly "}[EnvGroup](/docs/reference/stable/chat/adapters/interfaces/EnvGroup){"[]"}</code>

  Mutually exclusive credential modes. A caller usually satisfies exactly
  one group.
</ResponseField>

<ResponseField name={"notes"} type={"string"}>
  Additional caveats that do not fit the structured fields.
</ResponseField>

<ResponseField name={"optional"} type={"readonly EnvVar[]"}>
  **Type:** <code>{"readonly "}[EnvVar](/docs/reference/stable/chat/adapters/interfaces/EnvVar){"[]"}</code>

  Optional environment variables that tune behavior but are safe to omit.
</ResponseField>

<ResponseField name={"required"} type={"readonly EnvVar[]"}>
  **Type:** <code>{"readonly "}[EnvVar](/docs/reference/stable/chat/adapters/interfaces/EnvVar){"[]"}</code>

  Variables needed regardless of credential mode.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.