> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# TableOptions

> Options for Table

## Properties

<ResponseField name={"align"} type={"TableAlignment[]"}>
  **Type:** <code>[TableAlignment](/docs/reference/stable/chat/index/types/TableAlignment){"[]"}</code>

  Column alignment
</ResponseField>

<ResponseField name={"caption"} type={"string"}>
  Accessible table caption (used by platforms with native table support)
</ResponseField>

<ResponseField name={"gridLines"} type={"boolean"}>
  Draw grid lines between cells (default true). Rendered by Teams only; other adapters ignore it
</ResponseField>

<ResponseField name={"gridStyle"} type={"TableGridStyle"} typeHref={"/reference/stable/chat/index/types/TableGridStyle"}>
  Style of the grid lines between cells. Rendered by Teams only; other adapters ignore it
</ResponseField>

<ResponseField name={"headers"} type={"string[]"} required>
  Column header labels
</ResponseField>

<ResponseField name={"pageSize"} type={"number"}>
  Rows per page on platforms that paginate tables (Slack: 1-100, default 5)
</ResponseField>

<ResponseField name={"rows"} type={"string[][]"} required>
  Data rows
</ResponseField>

<ResponseField name={"verticalAlign"} type={"TableVerticalAlignment"} typeHref={"/reference/stable/chat/index/types/TableVerticalAlignment"}>
  Vertical alignment of cell content. Rendered by Teams only; other adapters ignore it
</ResponseField>

<ResponseField name={"widths"} type={"number[]"}>
  Relative column widths, one positive integer weight per column (default 1 each). Rendered by Teams only; other adapters ignore it
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.