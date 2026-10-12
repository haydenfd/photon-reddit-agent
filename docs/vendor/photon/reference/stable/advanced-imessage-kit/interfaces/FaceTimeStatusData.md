> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# FaceTimeStatusData

## Properties

<ResponseField name={"address"} type={"string"} required />

<ResponseField name={"ended_error"} type={"string"} required />

<ResponseField name={"ended_reason"} type={"string"} required />

<ResponseField name={"handle"} type={"HandleResponse | null"}>
  **Type:** <code>[HandleResponse](/docs/reference/stable/advanced-imessage-kit/types/HandleResponse){" | null"}</code>
</ResponseField>

<ResponseField name={"image_url"} type={"string"} required />

<ResponseField name={"is_audio"} type={"boolean"} required />

<ResponseField name={"is_outgoing"} type={"boolean"} required />

<ResponseField name={"is_video"} type={"boolean"} required />

<ResponseField name={"status"} type={"string"} required />

<ResponseField name={"status_id"} type={"number"} required />

<ResponseField name={"url"} type={"string | null"} />

<ResponseField name={"uuid"} type={"string"} required />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.