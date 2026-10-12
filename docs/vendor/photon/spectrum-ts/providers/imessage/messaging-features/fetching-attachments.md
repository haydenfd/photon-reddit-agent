> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Fetching iMessage attachments

> Retrieve cloud iMessage attachments directly by GUID.

Retrieve an attachment by its iMessage GUID using `getAttachment` on the
narrowed platform instance. The returned
[Attachment](/docs/reference/stable/spectrum-ts/symbols/attachment) is
lazy. `.read()` and `.stream()` each trigger an independent download, so cache
`.read()` if you need the bytes more than once.

```ts theme={null}
import { imessage } from "spectrum-ts/providers/imessage";

const im = imessage(app);
const att = await im.getAttachment("p:0/GUID");

if (att) {
  console.log(att.name, att.mimeType, att.size);
  const bytes = await att.read();
}
```

In multi-phone mode, pass the phone number as the second argument to route the
request through the correct instance:

```ts theme={null}
const att = await im.getAttachment("p:0/GUID", "+15559999999");
```

When only one phone is configured, or in shared-pool mode, the phone parameter
is optional.

<Note>
  `getAttachment` requires `@spectrum-ts/imessage`. With
  `@spectrum-ts/imessage-local`, it throws an
  [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror).
  Local inbound attachments are still available through each incoming
  message's content.
</Note>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.