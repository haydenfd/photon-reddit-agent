> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageUpdatedHandler

> Handler for message edit/update events.

Registered via `chat.onMessageUpdated(handler)`. Called when an adapter
receives a platform edit event and can provide the updated message.

Message updates are lifecycle events: they do not route through
`onNewMessage`, `onNewMention`, or `onSubscribedMessage`, and they are not
subject to the concurrency strategies. There is no `MessageContext` here
because nothing coalesces edits, every edit dispatches on its own.

The bot's own edits are filtered out, so post-and-edit streaming does not
call this handler back once per delta.

`previousMessage` is the message as it read before the edit, present when
the platform sends it (Slack does). Use it to diff the change rather than
only seeing the result.

```typescript
type MessageUpdatedHandler = (thread: Thread<TState>, message: Message, previousMessage: Message) => void | Promise<void>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.