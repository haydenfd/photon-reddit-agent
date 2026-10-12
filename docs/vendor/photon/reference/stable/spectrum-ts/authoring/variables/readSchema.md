> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# readSchema

> A marks the conversation as read up to , surfacing a read receipt to the sender where the platform supports one.

A `read` marks the conversation as read **up to** `target`, surfacing a
read receipt to the sender where the platform supports one.

`space.send(read(message))` is the canonical outbound API;
`message.read()` and `space.read(message)` are sugar that delegate here.
Reads are fire-and-forget — providers handle them inside their `send`
action and the resolved value is `undefined`.

Granularity is per-platform:

* WhatsApp Business: per-message receipt via `markRead(target.id)`, which
  also marks every earlier message in the conversation as read.
* iMessage (remote): chat-level `chats.markRead(chatGuid)` — `target` only
  identifies the chat, and **every** unread message in it is marked read.
  Local mode rejects with `UnsupportedError` (warned and skipped).
* Telegram / Slack: silently no-op. Neither surfaces read state for bot
  conversations (Telegram bot chats are effectively auto-read), so the
  signal is vacuously satisfied — same best-effort contract as `typing`.

```typescript
const readSchema: z.ZodObject<{ target: z.ZodCustom<Message<string, User, Space<unknown>>, Message<string, User, Space<unknown>>>; type: z.ZodLiteral<"read"> }, z.core.$strip>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.