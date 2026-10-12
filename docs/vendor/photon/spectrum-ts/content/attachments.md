> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Attachments

> Send files from paths, URLs, or buffers with stable attachment IDs.

Use `attachment()` to send files. Pass a file path, a `URL`, or a `Buffer`. MIME types are detected from the file extension. Override with `options.mimeType` when you already have the bytes.

```ts theme={null}
import { attachment } from "spectrum-ts";

// From a file path - name and MIME type inferred
await space.send(attachment("/path/to/photo.jpg"));

// From a buffer - provide name and MIME type
await space.send(attachment(buffer, {
  name: "report.pdf",
  mimeType: "application/pdf",
}));
```

If the MIME type can't be inferred from the name and you didn't pass `options.mimeType`, `attachment()` throws when the content is built.

## Attachment IDs

Every resolved attachment carries a stable `id`. When the attachment originates from a provider, the ID preserves the provider-native identifier, such as an iMessage GUID, Slack file ID, or WhatsApp media ID.

For outbound attachments built with `attachment()`, Spectrum assigns a random UUID unless you pass `options.id`:

```ts theme={null}
await space.send(attachment(buffer, {
  id: "custom-id",
  name: "report.pdf",
  mimeType: "application/pdf",
}));
```

Use the resolved [Attachment](/docs/reference/stable/spectrum-ts/symbols/attachment) and accepted [AttachmentInput](/docs/reference/stable/spectrum-ts/symbols/attachmentinput) input types in your own signatures:

```ts theme={null}
import { type Attachment, type AttachmentInput } from "spectrum-ts";
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.