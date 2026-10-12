> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ApprovalCardOptions

> Options describing the approval card posted by .

Options describing the approval card posted by `requestApproval`.

## Properties

<ResponseField name={"approveLabel"} type={"string"}>
  Label for the approve button. Default: "Approve"
</ResponseField>

<ResponseField name={"denyLabel"} type={"string"}>
  Label for the deny button. Default: "Deny"
</ResponseField>

<ResponseField name={"description"} type={"string"}>
  Optional body text (markdown) rendered above the fields
</ResponseField>

<ResponseField name={"fields"} type={"Record<string, string>"}>
  Key/value pairs rendered as a bold-label list on the card
</ResponseField>

<ResponseField name={"subtitle"} type={"string"}>
  Optional subtitle rendered under the title
</ResponseField>

<ResponseField name={"title"} type={"string"} required>
  Card title, e.g. "Deploy v1.2.3?"
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.