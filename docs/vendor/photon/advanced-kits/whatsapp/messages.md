> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Messages

> Send text, media, location, contacts, and reactions

Every outbound message goes through `client.messages.send(params)`. The `params` shape is a discriminated [SendMessageParams](/docs/reference/stable/whatsapp-business/symbols/sendmessageparams) — common fields (`to`, optional `replyTo`, optional `bizOpaqueCallbackData`) plus exactly one content key.

## Recipient format

`to` is a WhatsApp ID — the recipient's phone number in international format. Either `+15551234567` or `15551234567` is accepted.

## Text

```ts theme={null}
await client.messages.send({
  to: "+15551234567",
  text: "Hello!",
});
```

Pass a string for quick sends, or a [TextInput](/docs/reference/stable/whatsapp-business/symbols/textinput) for richer options:

```ts theme={null}
await client.messages.send({
  to: "+15551234567",
  text: { body: "Check this out: https://photon.codes", previewUrl: true },
});
```

<Accordion title="TextInput">
  [TextInput reference](/docs/reference/stable/whatsapp-business/symbols/textinput)
</Accordion>

## Media

Images, videos, audio, and documents all share the same [MediaInput](/docs/reference/stable/whatsapp-business/symbols/mediainput) shape. Send by referencing an uploaded `id` or a public `link`:

```ts theme={null}
// Upload first, then reference by ID
const { mediaId } = await client.media.upload({
  file: await readFile("/path/to/photo.jpg"),
  mimeType: "image/jpeg",
});

await client.messages.send({
  to: "+15551234567",
  image: { id: mediaId, caption: "Here's the photo" },
});

// Or point at a hosted URL
await client.messages.send({
  to: "+15551234567",
  document: {
    link: "https://example.com/report.pdf",
    filename: "Q1-report.pdf",
  },
});
```

<Accordion title="MediaInput">
  [MediaInput reference](/docs/reference/stable/whatsapp-business/symbols/mediainput)
</Accordion>

See [Media](/docs/advanced-kits/whatsapp/media) for the upload flow and size limits.

### Content types

| Key | Accepts | Use for |
| - | - | - |
| `image` | `MediaInput` | JPEG, PNG |
| `video` | `MediaInput` | MP4, 3GP |
| `audio` | `MediaInput` | AAC, MP4 audio, AMR, MP3, OGG |
| `document` | `MediaInput` | Any file with a filename |
| `sticker` | `StickerInput` (id or link only) | WebP stickers |

## Location

```ts theme={null}
await client.messages.send({
  to: "+15551234567",
  location: {
    latitude: 37.422,
    longitude: -122.084,
    name: "Googleplex",
    address: "1600 Amphitheatre Pkwy, Mountain View, CA",
  },
});
```

## Contact cards

Send one or more vCard-style contact cards:

```ts theme={null}
await client.messages.send({
  to: "+15551234567",
  contacts: [
    {
      name: { formattedName: "Alice Example", firstName: "Alice" },
      phones: [{ phone: "+15559876543", type: "MOBILE" }],
      emails: [{ email: "alice@example.com" }],
      addresses: [],
      urls: [],
    },
  ],
});
```

## Reactions

React to an incoming message by ID. Use an empty string for `emoji` to remove a reaction.

```ts theme={null}
await client.messages.send({
  to: "+15551234567",
  reaction: {
    messageId: "wamid.HBgMMTU1NT...",
    emoji: "❤️",
  },
});
```

## Replies

Thread a reply by setting `replyTo`:

```ts theme={null}
await client.messages.send({
  to: event.message.from,
  replyTo: event.message.id,
  text: "Replying to your last message.",
});
```

## Interactive and templates

Rich messages — buttons, lists, product carousels, flows, and pre-approved templates — have their own pages:

* [Interactive messages](/docs/advanced-kits/whatsapp/interactive-messages) — buttons, lists, flows, product messages
* [Templates](/docs/advanced-kits/whatsapp/templates) — template builder, parameters, carousels

## Mark as read

Clear unread state on the recipient's side:

```ts theme={null}
await client.messages.markRead(event.message.id);
```

## Send result

Every `send()` returns a [SendMessageResult](/docs/reference/stable/whatsapp-business/symbols/sendmessageresult) — record `messageId` if you plan to reply to, react to, or track status for that message.

```ts theme={null}
const { messageId, messageStatus } = await client.messages.send({
  to: "+15551234567",
  text: "Hello",
});
```

## Abort signal

Every method accepts an optional `RequestOptions` with an `AbortSignal`:

```ts theme={null}
const ctrl = new AbortController();
setTimeout(() => ctrl.abort(), 5000);

await client.messages.send(
  { to: "+15551234567", text: "Hello" },
  { signal: ctrl.signal },
);
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.