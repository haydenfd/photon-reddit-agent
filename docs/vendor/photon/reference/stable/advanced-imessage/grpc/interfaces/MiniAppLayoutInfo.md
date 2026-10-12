> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MiniAppLayoutInfo

> Visible fields decoded from an inbound iMessage mini-app card.

## Properties

<ResponseField name={"caption"} type={"string"}>
  Top-left, bold. The most prominent text slot.
</ResponseField>

<ResponseField name={"imageSubtitle"} type={"string"}>
  Overlay text shown below `imageTitle`, above the image edge.
</ResponseField>

<ResponseField name={"imageTitle"} type={"string"}>
  Overlay text shown above the image.
</ResponseField>

<ResponseField name={"subcaption"} type={"string"}>
  Below `caption`, on the left.
</ResponseField>

<ResponseField name={"summary"} type={"string"}>
  Fallback text shown when the full card cannot be rendered.
</ResponseField>

<ResponseField name={"trailingCaption"} type={"string"}>
  Top-right.
</ResponseField>

<ResponseField name={"trailingSubcaption"} type={"string"}>
  Below `trailingCaption`, on the right.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.