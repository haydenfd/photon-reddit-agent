> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# DirectMessageHandler

> Handler for direct messages (1:1 conversations with the bot).

Registered via `chat.onDirectMessage(handler)`. Called for every message
received in a DM thread when at least one direct message handler is
registered. Direct message handlers run before `onSubscribedMessage`,
`onNewMention`, and pattern handlers.

If no `onDirectMessage` handlers are registered, DMs continue through normal
routing. Unsubscribed DMs fall through to `onNewMention` for backward
compatibility.

```typescript
type DirectMessageHandler = (thread: Thread<TState>, message: Message, channel: Channel<TState>, context: MessageContext) => void | Promise<void>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.