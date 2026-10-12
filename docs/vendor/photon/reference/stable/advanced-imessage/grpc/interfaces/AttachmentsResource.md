> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# AttachmentsResource

> Attachment APIs.

* `get(attachment)` fetches metadata for an uploaded or received
  attachment.
* `upload(input)` uploads file bytes and optional Live Photo companion
  data.
* `downloadStream(attachment)` streams a header frame followed by byte
  chunks.

## Methods

### downloadStream()

```typescript
downloadStream(attachment: string): TypedEventStream<DownloadAttachmentChunk>
```

#### Parameters

<ResponseField name={"attachment"} type={"string"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/advanced-imessage/grpc/classes/TypedEventStream){"<"}[DownloadAttachmentChunk](/docs/reference/stable/advanced-imessage/grpc/types/DownloadAttachmentChunk){">"}</code>

### get()

```typescript
get(attachment: string): Promise<AttachmentInfo>
```

#### Parameters

<ResponseField name={"attachment"} type={"string"} required />

#### Returns

<code>{"Promise<"}[AttachmentInfo](/docs/reference/stable/advanced-imessage/grpc/interfaces/AttachmentInfo){">"}</code>

### upload()

```typescript
upload(input: AttachmentInput): Promise<UploadAttachmentResult>
```

#### Parameters

<ResponseField name={"input"} type={"AttachmentInput"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/AttachmentInput"} required />

#### Returns

<code>{"Promise<"}[UploadAttachmentResult](/docs/reference/stable/advanced-imessage/grpc/interfaces/UploadAttachmentResult){">"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.