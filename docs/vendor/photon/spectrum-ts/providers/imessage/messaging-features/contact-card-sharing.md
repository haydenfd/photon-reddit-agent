> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Native iMessage contact card sharing

> Share the bot account's own iMessage contact card in a chat.

Share the bot account's own iMessage contact card directly in a chat. Use
`nativeContactCard()` to build the content, or the `space.shareContactCard()`
sugar method on a narrowed iMessage space:

<Tabs>
  <Tab title="Sugar (space.shareContactCard)">
    ```ts theme={null}
    import { imessage } from "spectrum-ts/providers/imessage";

    const im = imessage(space);
    await im.shareContactCard();
    ```
  </Tab>

  <Tab title="Canonical (space.send)">
    ```ts theme={null}
    import { nativeContactCard } from "spectrum-ts/providers/imessage";

    await space.send(nativeContactCard());
    ```
  </Tab>
</Tabs>

This shares the bot's own contact card as it appears in iMessage. Recipients
can tap it to save the contact. Use it in onboarding flows where you want users
to add your bot to their contacts.

<Note>
  Native contact card sharing requires `@spectrum-ts/imessage`. With
  `@spectrum-ts/imessage-local`, `nativeContactCard()` throws an
  [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror).
</Note>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.