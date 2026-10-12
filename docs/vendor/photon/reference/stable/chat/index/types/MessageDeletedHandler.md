> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageDeletedHandler

> Handler for message delete events.

Registered via `chat.onMessageDeleted(handler)`. This is a lifecycle event
and does not route through normal message handlers.

Unlike every other handler this receives an event rather than
`(thread, message)`. A delete has no message: platforms usually report only
the id of what was removed, and `previousMessage` is best-effort. Handing
over a `Thread` built from nothing would imply context that is not there.
Call `chat.thread(event.threadId)` when you need one, for example to post a
notice in the conversation the message was removed from.

```typescript
type MessageDeletedHandler = (event: MessageDeletedEvent) => void | Promise<void>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.