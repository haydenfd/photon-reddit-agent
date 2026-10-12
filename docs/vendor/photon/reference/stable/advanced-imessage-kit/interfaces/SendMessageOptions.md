> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# SendMessageOptions

## Properties

<ResponseField name={"bubbleEffect"} type={"BubbleEffect"} typeHref={"/reference/stable/advanced-imessage-kit/types/BubbleEffect"} />

<ResponseField name={"chatGuid"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"partIndex"} type={"number"} />

<ResponseField name={"richLink"} type={"boolean"} />

<ResponseField name={"selectedMessageGuid"} type={"string"} />

<ResponseField name={"subject"} type={"string"} />

<ResponseField name={"tempGuid"} type={"string"} />

<ResponseField name={"textAnimation"} type={"TextAnimation"} typeHref={"/reference/stable/advanced-imessage-kit/types/TextAnimation"} />

<ResponseField name={"textStyles"} type={"TextStyle[]"}>
  **Type:** <code>[TextStyle](/docs/reference/stable/advanced-imessage-kit/interfaces/TextStyle){"[]"}</code>
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.