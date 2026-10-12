> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Telegram conversations and features

> Start Telegram conversations and review supported provider features.

Use [platform narrowing](/docs/spectrum-ts/platform-narrowing) when you need Telegram-specific actions.

## Starting a conversation

Resolve a user by their Telegram user ID to open their private chat. Telegram bots cannot create groups. Use `space.get(chatId)` for an existing group, supergroup, or channel, and stringify numeric Telegram chat IDs.

```ts theme={null}
const tg = telegram(app);
const user = await tg.user("123456789");
const space = await tg.space.create(user);

await space.send("Hello from Spectrum.");

const group = await tg.space.get(process.env.TELEGRAM_CHAT_ID!);
await group.send("Hello, existing group.");
```

## Supported features

| Feature | Support |
| - | - |
| Text messages | Send and receive |
| Markdown | Send, rendered as Telegram HTML via `parse_mode` |
| Streaming text / markdown | Send, with native draft preview in private chats |
| Media, photos, documents, audio, and video | Send and receive |
| Reactions | Send and receive |
| Threaded replies | Send and receive |
| Typing indicators | Send |
| Message edits | Send and receive, including text and markdown |
| Custom Bot API calls | Send with `custom({ method, params })` content |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.