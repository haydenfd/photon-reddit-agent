> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Media

> Upload, fetch, and delete images, video, audio, and documents

The `media` resource handles the lifecycle of every file you send or receive. Uploaded media gets a `mediaId` you reference from `messages.send`; inbound media arrives as a `mediaId` you resolve to a signed URL.

## Upload

```ts theme={null}
import { readFile } from "node:fs/promises";

const { mediaId } = await client.media.upload({
  file: await readFile("/path/to/photo.jpg"),
  mimeType: "image/jpeg",
  filename: "photo.jpg",
});

await client.messages.send({
  to: "+15551234567",
  image: { id: mediaId, caption: "Here's the photo" },
});
```

`file` accepts a `Buffer` or `Uint8Array` — stream the file yourself if it doesn't fit in memory.

<Accordion title="UploadOptions">
  [UploadOptions reference](/docs/reference/stable/whatsapp-business/symbols/uploadoptions)
</Accordion>

Returns an [UploadResult](/docs/reference/stable/whatsapp-business/symbols/uploadresult). Save the `mediaId` only long enough to use it — WhatsApp expires uploaded media after \~30 days.

## Get URL

Resolve an inbound `mediaId` to a signed, time-limited URL plus metadata:

```ts theme={null}
for await (const event of client.events.subscribe()) {
  if (event.type !== "message") continue;
  if (event.message.content.type !== "image") continue;

  const { url, mimeType, fileSize, sha256 } = await client.media.getUrl(
    event.message.content.media.id,
  );

  // Fetch the bytes yourself
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}` },
  });
  const bytes = await response.arrayBuffer();
}
```

<Accordion title="MediaUrlResult">
  [MediaUrlResult reference](/docs/reference/stable/whatsapp-business/symbols/mediaurlresult)
</Accordion>

The URL is signed by Meta and requires your access token in the `Authorization` header when you fetch it.

## Delete

```ts theme={null}
await client.media.delete(mediaId);
```

Removes the uploaded file from Meta's storage. Safe to skip if you're happy to let the 30-day expiration handle cleanup — delete explicitly when you need the space freed immediately (e.g. compliance requirements).

## Supported MIME types

WhatsApp restricts which types are accepted per content category. The SDK passes whatever you give it — validation happens server-side.

| Category | Common types |
| - | - |
| Image | `image/jpeg`, `image/png` |
| Video | `video/mp4`, `video/3gpp` |
| Audio | `audio/aac`, `audio/mp4`, `audio/mpeg`, `audio/amr`, `audio/ogg` (voice notes only) |
| Document | Any MIME — PDFs, spreadsheets, archives |
| Sticker | `image/webp` |

Check the [official limits table](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media) for current size caps — they change per account tier.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.