> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Edits

> Rewrite previously sent outbound messages.

Use `edit()` to rewrite the content of a previously sent outbound message. Edits are fire-and-forget: `space.send(edit(...))` resolves to `undefined`.

```ts theme={null}
import { edit, text } from "spectrum-ts";

const sent = await space.send("Draft");
await space.send(edit(text("Final version"), sent));
```

`edit()` cannot wrap `edit`, `reply`, `reaction`, `group`, `typing`, `rename`, `avatar`, `addMember`, `removeMember`, `leaveSpace`, `unsend`, or `read` content.

Provider constraints surface at send time. For example, a provider may reject edits after its native edit window closes.

## Update an iMessage app card

iMessage app cards support in-place updates. Save the message returned by the original send and use it as the edit target:

```ts theme={null}
import { app, edit } from "spectrum-ts";

const card = await space.send(app("https://example.com/status/pending"));

await space.send(
  edit(app("https://example.com/status/complete"), card)
);
```

The original send returns the message record that identifies the card. The edit itself returns `undefined`, so keep using `card` if you need to update it again.

App-card updates require `@spectrum-ts/imessage`; they are not supported by
`@spectrum-ts/imessage-local`. See [App cards](/docs/spectrum-ts/content/app#update-an-app-card-in-place)
for live rendering and session details, or
[Customized iMessage Apps](/docs/spectrum-ts/providers/imessage/messaging-features/apps#update-an-imessage-app)
when you own the iMessage extension.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.