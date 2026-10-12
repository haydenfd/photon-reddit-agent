> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# EnvVar

> A single environment variable referenced by an adapter.

## Properties

<ResponseField name={"aliases"} type={"readonly string[]"}>
  Alternative variable names accepted for the same value.
</ResponseField>

<ResponseField name={"description"} type={"string"} required>
  Short description of what the value configures.
</ResponseField>

<ResponseField name={"key"} type={"string"} required>
  Canonical environment variable name.
</ResponseField>

<ResponseField name={"secret"} type={"boolean"} required>
  Whether the value is a credential, token, secret, or password that should
  be masked in logs and user interfaces.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.