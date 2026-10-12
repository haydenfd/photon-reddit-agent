> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Avatar

> Set or clear group chat avatars.

Use `avatar()` to set or clear the chat avatar, also called a group icon. It is fire-and-forget: `space.send(avatar(...))` resolves to `undefined`.

```ts theme={null}
import { avatar } from "spectrum-ts";

// Set from a file path - MIME type inferred from the extension
await space.send(avatar("./icon.png"));

// Set from a buffer - mimeType is required
await space.send(avatar(buffer, { mimeType: "image/jpeg" }));

// Clear the current avatar
await space.send(avatar("clear"));
```

`space.avatar(...)` is sugar for `space.send(avatar(...))`. Per-platform constraints, such as iMessage requiring remote mode and a group chat, surface as an [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror) from the provider's send action.

The [Avatar](/docs/reference/stable/spectrum-ts/symbols/avatar) content is bidirectional: on platforms that report it (iMessage remote mode today), someone else changing the icon arrives as an inbound message with `content.type === "avatar"` — `action.kind === "set"` carries the fetched icon behind `action.read()` with its `mimeType`, and `"clear"` mirrors icon removal. Over the Spectrum webhook, a `set` arrives metadata-only (its `read()` throws); fetch the current icon via `space.getAvatar()` instead, which returns [AvatarData](/docs/reference/stable/spectrum-ts/symbols/avatardata) with the image bytes and MIME type. `message.sender` is the user who changed it, or `undefined` when the platform recorded no actor.

<Note>
  The string `"clear"` is a reserved sentinel. If you have a file literally named `clear` with no extension, pass `"./clear"` or load it as a `Buffer`.
</Note>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.