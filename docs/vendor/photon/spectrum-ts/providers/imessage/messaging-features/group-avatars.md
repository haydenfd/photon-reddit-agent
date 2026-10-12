> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# iMessage group avatars

> Set, clear, and retrieve iMessage group chat icons.

Set or clear the group chat icon using `space.avatar()` or the canonical
`avatar()` content builder:

```ts theme={null}
import { avatar } from "spectrum-ts";

// Sugar - set from a file path
await space.avatar("./icon.png");

// Sugar - clear the current avatar
await space.avatar("clear");

// Canonical
await space.send(avatar("./icon.png"));
```

Read the current icon back with `space.getAvatar()`. It resolves to
[AvatarData](/docs/reference/stable/spectrum-ts/symbols/avatardata) or
`undefined` when the group has no icon. The result round-trips into the setter:

```ts theme={null}
const icon = await space.getAvatar();
if (icon) {
  await otherGroup.avatar(icon.data, { mimeType: icon.mimeType });
}
```

Group avatars require `@spectrum-ts/imessage` and only work on group chats.
With `@spectrum-ts/imessage-local`, or on a DM, `avatar()` and `getAvatar()`
throw an [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.