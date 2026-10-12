> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# iMessage tapback reactions

> Map Spectrum emoji aliases to native iMessage tapbacks.

iMessage converts six universal
[Emoji](/docs/reference/stable/spectrum-ts/symbols/emoji) aliases into native
tapbacks:

<Accordion title="Emoji">
  [Emoji reference](/docs/reference/stable/spectrum-ts/symbols/emoji)
</Accordion>

```ts theme={null}
import { Emoji } from "spectrum-ts";

await message.react(Emoji.laugh);
```

Other emoji are sent as ordinary emoji reactions when supported. Reactions
require the cloud iMessage package.

See [Reactions and replies](/docs/spectrum-ts/reactions-and-replies) for the
cross-platform reaction model.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.