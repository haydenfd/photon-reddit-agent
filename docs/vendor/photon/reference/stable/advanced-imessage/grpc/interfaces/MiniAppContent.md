> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MiniAppContent

> Public semantic data decoded from an inbound iMessage app-extension balloon.

## Properties

<ResponseField name={"appName"} type={"string"}>
  Display name embedded by the sending extension.
</ResponseField>

<ResponseField name={"appStoreId"} type={"number"}>
  App Store identifier supplied by the sender.
</ResponseField>

<ResponseField name={"extensionBundleId"} type={"string"} required>
  iMessage extension bundle identifier parsed from the balloon id.
</ResponseField>

<ResponseField name={"layout"} type={"MiniAppLayoutInfo"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/MiniAppLayoutInfo"}>
  Visible template fields decoded from the payload.
</ResponseField>

<ResponseField name={"live"} type={"boolean"} required>
  Whether the payload carries live-layout metadata.
</ResponseField>

<ResponseField name={"sessionId"} type={"string"}>
  Stable session identifier shared by updates to the same card.
</ResponseField>

<ResponseField name={"teamId"} type={"string"} required>
  Apple Team ID parsed from the balloon id.
</ResponseField>

<ResponseField name={"url"} type={"string"}>
  URL delivered to the extension when the recipient opens the card.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.