> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Terminal interactions

> Use reactions, replies, attachments, inline images, typing indicators, and console capture in the terminal provider.

Input and output are decoupled, so you can type while the agent is responding and the agent can push messages whenever it wants.

## What you get

| Feature | How |
| - | - |
| Multiple chats | `Ctrl+N` opens a new chat. `Ctrl+J` and `Ctrl+K` switch between them. Each chat is its own Spectrum space. |
| Reactions | Press `r` on a message to react. It arrives in your code as a `reaction` content message. |
| Replies | Press `e` to reply inline. It arrives with a `replyTo: { messageId }` extra on the message. |
| File attachments | Drag-and-drop into the terminal. Messages arrive with name, MIME type, and buffer. |
| Inline images | Rendered with the Kitty graphics protocol when supported, with a half-block fallback. |
| Typing indicators | `space.startTyping()` and `space.stopTyping()` show a live indicator. |
| Console capture | `console.log`, `info`, `warn`, `error`, and `debug` from your agent are forwarded into a pinned `__system__` chat instead of garbling the UI. |

## Reactions and replies

Reactions ride the same `app.messages` stream as text. They arrive as a `reaction` content message:

```ts theme={null}
for await (const [space, message] of app.messages) {
  if (message.content.type === "reaction") {
    console.log(`${message.sender?.id ?? "unknown"} reacted ${message.content.emoji}`);
    continue;
  }
  if (message.content.type === "text") {
    await message.react("👀");
    await space.send(`echo: ${message.content.text}`);
  }
}
```

Threaded replies arrive as a normal message with a `replyTo` field:

```ts theme={null}
const replyTo = (message as { replyTo?: { messageId: string } }).replyTo;
if (replyTo) {
  await message.reply(`acknowledged your reply to ${replyTo.messageId}`);
}
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.