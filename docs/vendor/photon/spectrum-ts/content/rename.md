> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Rename

> Rename chats through the content pipeline.

Use `rename()` to rename the current chat. It is fire-and-forget: `space.send(rename(...))` resolves to `undefined`.

```ts theme={null}
import { rename } from "spectrum-ts";

await space.send(rename("New Chat Name"));
```

`space.rename(displayName)` is sugar for `space.send(rename(displayName))`. The builder throws at construction time if `displayName` is empty.

Per-platform constraints, such as iMessage requiring remote mode and a group chat, surface as an [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror) from the provider's send action.

The [Rename](/docs/reference/stable/spectrum-ts/symbols/rename) content is bidirectional: on platforms that report it (iMessage remote mode today), someone else renaming the chat arrives as an inbound message with `content.type === "rename"` and the new `displayName`. `message.sender` is the user who renamed the chat, or `undefined` when the platform recorded no actor.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.