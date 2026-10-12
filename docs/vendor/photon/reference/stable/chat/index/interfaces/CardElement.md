> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# CardElement

> Root card element

## Properties

<ResponseField name={"children"} type={"CardChild[]"} required>
  **Type:** <code>[CardChild](/docs/reference/stable/chat/index/types/CardChild){"[]"}</code>

  Card content
</ResponseField>

<ResponseField name={"imageUrl"} type={"string"}>
  Header image URL
</ResponseField>

<ResponseField name={"subtitle"} type={"string"}>
  Card subtitle
</ResponseField>

<ResponseField name={"title"} type={"string"}>
  Card title
</ResponseField>

<ResponseField name={"type"} type={"\"card\""} required />

<ResponseField name={"width"} type={"CardWidth"} typeHref={"/reference/stable/chat/index/types/CardWidth"}>
  Width hint for platforms that can render a card wider than the default (Teams)
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.