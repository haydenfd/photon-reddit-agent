> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ButtonOptions

> Options for Button

## Properties

<ResponseField name={"actionType"} type={"\"action\" | \"modal\""}>
  Whether this button triggers a regular action or opens a modal dialog. Default: "action"
</ResponseField>

<ResponseField name={"callbackUrl"} type={"string"}>
  URL to POST action data to when this button is clicked
</ResponseField>

<ResponseField name={"disabled"} type={"boolean"}>
  If true, the button is displayed in an inactive state and doesn't respond to user actions
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Unique action ID for callback routing
</ResponseField>

<ResponseField name={"label"} type={"string"} required>
  Button label text
</ResponseField>

<ResponseField name={"style"} type={"ButtonStyle"} typeHref={"/reference/stable/chat/index/types/ButtonStyle"}>
  Visual style
</ResponseField>

<ResponseField name={"tooltip"} type={"string"}>
  Hover text for the button. Rendered by Teams only; other adapters ignore it
</ResponseField>

<ResponseField name={"value"} type={"string"}>
  Optional payload value sent with action callback
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.