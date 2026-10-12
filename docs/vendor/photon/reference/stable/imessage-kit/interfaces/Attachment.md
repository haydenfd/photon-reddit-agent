> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Attachment

> Message attachment information Contains file metadata and local path

Message attachment information

Contains file metadata and local path

## Properties

<ResponseField name={"createdAt"} type={"Date"} required>
  Attachment creation time
</ResponseField>

<ResponseField name={"filename"} type={"string"} required>
  Filename
</ResponseField>

<ResponseField name={"id"} type={"string"} required>
  Unique ID of the attachment in database
</ResponseField>

<ResponseField name={"isImage"} type={"boolean"} required>
  Whether this is an image type
</ResponseField>

<ResponseField name={"mimeType"} type={"string"} required>
  MIME type (e.g. image/jpeg)
</ResponseField>

<ResponseField name={"path"} type={"string"} required>
  Full local path to the file
</ResponseField>

<ResponseField name={"size"} type={"number"} required>
  File size in bytes
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.