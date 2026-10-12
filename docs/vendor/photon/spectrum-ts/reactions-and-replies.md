> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Reactions and Replies

> React to incoming messages and send threaded replies

Both `react` and `reply` live directly on an incoming message. They no-op silently on platforms that don't support the feature — no `try/catch` required.

Spectrum also exports first-class `reaction()`, `reply()`, and `unsend()` content builders that you can pass directly to `space.send(...)` — the sugar methods on `message` delegate through the same `send` pipeline.

## Reactions

<Tabs>
  <Tab title="Sugar (message.react)">
    ```ts theme={null}
    const sent = await message.react("❤️");
    ```
  </Tab>

  <Tab title="Canonical (space.send)">
    ```ts theme={null}
    import { reaction } from "spectrum-ts";

    const sent = await space.send(reaction("❤️", message));
    ```
  </Tab>
</Tabs>

Both forms are equivalent — `message.react(emoji)` delegates to `space.send(reaction(emoji, message))` internally.

Reactions resolve to a [Message](/docs/reference/stable/spectrum-ts/symbols/message) — keep it as the handle to `unsend()` later. Resolves `undefined` only when the platform does not support reactions.

Use the universal [Emoji](/docs/reference/stable/spectrum-ts/symbols/emoji) aliases for iMessage's native tapbacks:

```ts theme={null}
import { Emoji } from "spectrum-ts";

await message.react(Emoji.laugh);
```

`reaction()` rejects reaction messages as targets — reacting to a reaction throws at build time.

The iMessage tapback aliases are:

<Accordion title="Emoji">
  [Emoji reference](/docs/reference/stable/spectrum-ts/symbols/emoji)
</Accordion>

## Threaded replies

<Tabs>
  <Tab title="Sugar (message.reply)">
    ```ts theme={null}
    await message.reply("Replying to your message.");

    await message.reply(
      "Here's the attachment you asked for:",
      attachment("/path/to/file.pdf"),
    );
    ```
  </Tab>

  <Tab title="Canonical (space.send)">
    ```ts theme={null}
    import { reply, text } from "spectrum-ts";

    await space.send(reply(text("Replying to your message."), message));
    ```
  </Tab>
</Tabs>

Both forms are equivalent — `message.reply(content)` wraps each content item in `reply(content, message)` and delegates to `space.send(...)` internally.

On platforms with thread support (iMessage, WhatsApp Business), this sends a threaded reply. On platforms without, the call resolves as a no-op — **the reply is not downgraded to a regular send**. If you need guaranteed delivery, use `space.send(...)` instead.

`reply()` cannot wrap `reply`, `edit`, `reaction`, `group`, `typing`, `rename`, `avatar`, `addMember`, `removeMember`, `leaveSpace`, `unsend`, or `read` content — the builder throws at construction time.

## Editing messages

<Tabs>
  <Tab title="Sugar (message.edit)">
    ```ts theme={null}
    const sent = await space.send("Draft");
    await sent?.edit("Final version");
    ```
  </Tab>

  <Tab title="Canonical (space.send)">
    ```ts theme={null}
    import { edit, text } from "spectrum-ts";

    const sent = await space.send("Draft");
    await space.send(edit(text("Final version"), sent));
    ```
  </Tab>
</Tabs>

`edit()` takes new content and the outbound message to rewrite. Edits are fire-and-forget — `space.send(edit(...))` resolves to `undefined`.

`edit()` cannot wrap `edit`, `reply`, `reaction`, `group`, `typing`, `rename`, `avatar`, `addMember`, `removeMember`, `leaveSpace`, `unsend`, or `read` content.

## Unsending messages

<Tabs>
  <Tab title="Sugar (message.unsend)">
    ```ts theme={null}
    const sent = await space.send("Oops");
    await sent?.unsend();
    ```
  </Tab>

  <Tab title="Sugar (space.unsend)">
    ```ts theme={null}
    const sent = await space.send("Oops");
    await space.unsend(sent);
    ```
  </Tab>

  <Tab title="Canonical (space.send)">
    ```ts theme={null}
    import { unsend } from "spectrum-ts";

    const sent = await space.send("Oops");
    await space.send(unsend(sent));
    ```
  </Tab>
</Tabs>

Unsends retract a previously-sent outbound message. Fire-and-forget — the result is always `undefined`. Only outbound messages can be unsent; the builder throws at build time for inbound targets.

Reactions can also be unsent — keep the [Message](/docs/reference/stable/spectrum-ts/symbols/message) returned by `react()` and pass it to `unsend()`:

```ts theme={null}
const reaction = await message.react("❤️");
await reaction?.unsend();
```

## When to use what

| Want to | Use |
| - | - |
| Send fresh content into the conversation | `space.send(...)` |
| Reply in-thread to a specific message | `message.reply(...)` or `space.send(reply(...))` |
| React to a specific message | `message.react(emoji)` or `space.send(reaction(emoji, message))` |
| Rewrite a sent message | `message.edit(content)` or `space.send(edit(content, message))` |
| Retract a sent message | `message.unsend()` or `space.unsend(message)` or `space.send(unsend(message))` |

`space.send` is the safe default — it works on every platform. The sugar methods (`message.reply`, `message.react`, `message.edit`, `message.unsend`) and the canonical content builders (`reply()`, `reaction()`, `edit()`, `unsend()`) are interchangeable — they both route through the same `send` pipeline.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.