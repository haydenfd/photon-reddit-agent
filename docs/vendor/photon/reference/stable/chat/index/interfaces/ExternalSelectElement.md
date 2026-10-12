> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ExternalSelectElement

## Properties

<ResponseField name={"id"} type={"string"} required />

<ResponseField name={"initialOption"} type={"SelectOptionElement"} typeHref={"/reference/stable/chat/index/interfaces/SelectOptionElement"} />

<ResponseField name={"label"} type={"string"} required />

<ResponseField name={"minQueryLength"} type={"number"} />

<ResponseField name={"optional"} type={"boolean"} />

<ResponseField name={"placeholder"} type={"string"} />

<ResponseField name={"type"} type={"\"external_select\""} required />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.