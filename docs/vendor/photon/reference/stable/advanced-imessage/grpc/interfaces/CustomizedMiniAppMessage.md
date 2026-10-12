> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# CustomizedMiniAppMessage

## Properties

<ResponseField name={"appName"} type={"string"} required>
  Display name of the owning app, shown by Messages fallback UI.
</ResponseField>

<ResponseField name={"appStoreId"} type={"number"}>
  Apple App Store numeric id of the owning app. When set, must be a positive integer.
</ResponseField>

<ResponseField name={"extensionBundleId"} type={"string"} required>
  Bundle identifier of the iMessage extension target. Must not contain `:`.
</ResponseField>

<ResponseField name={"layout"} type={"MiniAppLayout"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/MiniAppLayout"} required>
  Visible card layout.
</ResponseField>

<ResponseField name={"live"} type={"boolean"}>
  Render with the installed extension's live UI when available. Defaults to `false`.
</ResponseField>

<ResponseField name={"teamId"} type={"string"} required>
  10-character uppercase alphanumeric Apple Team ID.
</ResponseField>

<ResponseField name={"url"} type={"string"} required>
  Absolute HTTP or HTTPS URL delivered to the installed extension on tap.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.