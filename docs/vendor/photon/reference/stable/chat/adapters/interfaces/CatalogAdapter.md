> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# CatalogAdapter

> Metadata for one cataloged Chat SDK adapter.

## Properties

<ResponseField name={"description"} type={"string"} required>
  One-line summary of what the adapter connects to.
</ResponseField>

<ResponseField name={"env"} type={"AdapterEnvSpec"} typeHref={"/reference/stable/chat/adapters/interfaces/AdapterEnvSpec"} required>
  Environment variables and constructor-only configuration.
</ResponseField>

<ResponseField name={"factoryExport"} type={"string"} required>
  Named factory export from `CatalogAdapter.packageName`.
</ResponseField>

<ResponseField name={"group"} type={"\"vendor-official\" | \"official\""} required>
  Catalog group used by the docs adapter listing.
</ResponseField>

<ResponseField name={"importPath"} type={"string"}>
  Module specifier the factory is imported from, when the adapter ships on
  a subpath of `CatalogAdapter.packageName`. The package to install is
  still `packageName`. Defaults to `packageName` when omitted.
</ResponseField>

<ResponseField name={"name"} type={"string"} required>
  Display name.
</ResponseField>

<ResponseField name={"packageName"} type={"string"} required>
  NPM package that provides the adapter implementation.
</ResponseField>

<ResponseField name={"peerDeps"} type={"readonly string[]"} required>
  Runtime packages the adapter expects the consuming app to provide or
  install alongside it.
</ResponseField>

<ResponseField name={"slug"} type={"string"} required>
  Stable catalog slug.
</ResponseField>

<ResponseField name={"type"} type={"\"platform\" | \"state\""} required>
  Whether the adapter connects to a messaging platform or stores Chat SDK
  state.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.