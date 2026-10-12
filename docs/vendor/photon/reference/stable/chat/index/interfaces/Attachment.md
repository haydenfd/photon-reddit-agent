> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Attachment

## Properties

<ResponseField name={"data"} type={"any"}>
  Binary data (for uploading or if already fetched)
</ResponseField>

<ResponseField name={"fetchData"} type={"() => Promise<any>"}>
  Fetch the attachment data.
  For platforms that require authentication (like Slack private URLs),
  this method handles the auth automatically.
</ResponseField>

<ResponseField name={"fetchMetadata"} type={"Record<string, string>"}>
  Platform-specific metadata needed to reconstruct fetchData after serialization.
  Adapters store IDs here (e.g. WhatsApp mediaId, Telegram fileId) so that
  fetchData can be rebuilt when a message is rehydrated from the queue.
</ResponseField>

<ResponseField name={"height"} type={"number"}>
  Image/video height (if applicable)
</ResponseField>

<ResponseField name={"mimeType"} type={"string"}>
  MIME type
</ResponseField>

<ResponseField name={"name"} type={"string"}>
  Filename
</ResponseField>

<ResponseField name={"size"} type={"number"}>
  File size in bytes
</ResponseField>

<ResponseField name={"type"} type={"\"image\" | \"file\" | \"video\" | \"audio\""} required>
  Type of attachment
</ResponseField>

<ResponseField name={"url"} type={"string"}>
  URL to the file (for linking/downloading)
</ResponseField>

<ResponseField name={"width"} type={"number"}>
  Image/video width (if applicable)
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.