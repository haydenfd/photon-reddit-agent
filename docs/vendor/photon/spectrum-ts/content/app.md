> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# App

> Send and update a tappable app card, with optional live rendering on supported platforms.

Use `app()` when you want to present a URL as a tappable card instead of an inline link.

## Send an app card

The first argument is [AppUrl](/docs/reference/stable/spectrum-ts/symbols/appurl). The only thing a caller supplies: the URL. It is itself consumable — pass a string, a promise, or a thunk (sync or async). The thunk form lets the URL be computed at send time (e.g. minting a signed link).

```ts theme={null}
import { app } from "spectrum-ts";

await space.send(app("https://example.com/deep-link"));
```

On iMessage, the recipient gets a native iMessage App card. On Slack, Telegram,
WhatsApp, and terminal, Spectrum sends the URL using that platform's normal
link behavior.

## Show the app's live UI

The second argument is [AppOptions](/docs/reference/stable/spectrum-ts/symbols/appoptions).

Set `live` to `true` to request live rendering:

```ts theme={null}
import { app } from "spectrum-ts";

await space.send(
  app("https://example.com/dashboard", {
    live: true,
  })
);
```

<Accordion title="AppOptions">
  [AppOptions reference](/docs/reference/stable/spectrum-ts/symbols/appoptions)
</Accordion>

When `live` is omitted, iMessage shows the card's static URL preview. Platforms without a live app surface ignore the option and keep their normal URL fallback.

<Note>
  `live` is a rendering hint. The recipient needs a supported platform and the
  corresponding app extension for its live UI to appear.
</Note>

## Update an app card in place

An iMessage app card sent through `@spectrum-ts/imessage` can be updated without sending a second bubble. Keep the message returned by the original send, then pass it to `edit()`:

```ts theme={null}
import { app, edit } from "spectrum-ts";

const card = await space.send(
  app("https://example.com/order/123", {
    live: true,
  })
);

await space.send(
  edit(
    app("https://example.com/order/123?status=shipped", {
      live: true,
    }),
    card
  )
);
```

The recipient sees the existing card update in place. You can change its URL, generated layout, and live-rendering option.

Keep using `card` for later updates. `space.send(edit(...))` resolves to `undefined`; it does not return a replacement message.

<Note>
  In-place app-card updates require `@spectrum-ts/imessage`. They are not
  available through `@spectrum-ts/imessage-local` or the URL fallbacks on other
  providers.
</Note>

### How update sessions work

A successful iMessage App send returns an iMessage message with
`miniAppCardSession` metadata. Spectrum passes this session back to iMessage
when you call `edit()` and refreshes it after each successful update.

Most applications should treat `miniAppCardSession` as provider-managed
metadata: keep the original returned message and let Spectrum use it. A message
without this metadata cannot identify an existing iMessage App card to update.

## How iMessage delivers app cards

On iMessage, app cards open inside the [Spectrum iMessage App](https://apps.apple.com/ca/app/spectrum-by-photon/id6777616651),
an iMessage App launcher approved by Apple. Recipients download it once on
first use (they can download it directly inside the Messages app); after that,
every app card you send opens directly in Messages without leaving the
conversation.

The launcher keeps a library of every iMessage App a recipient has opened, so
they can reopen those apps later or share them with friends.

For an iMessage extension with its own identity and layout control, see
[Customized iMessage Apps](/docs/spectrum-ts/providers/imessage/messaging-features/apps).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.