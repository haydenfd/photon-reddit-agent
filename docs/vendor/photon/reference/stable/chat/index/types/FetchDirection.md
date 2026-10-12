> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# FetchDirection

> Direction for fetching messages.

* `backward`: Fetch most recent messages first. Pagination moves toward older messages.
  This is the default, suitable for loading a chat view (show latest messages first).

* `forward`: Fetch oldest messages first. Pagination moves toward newer messages.
  Suitable for iterating through message history from the beginning.

In both directions, messages within each page are returned in chronological order
(oldest first), which is the natural reading order for chat messages.

```typescript
// Load most recent 50 messages (default)
const recent = await adapter.fetchMessages(threadId, { limit: 50 });
// recent.messages: [older, ..., newest] (chronological within page)
// recent.nextCursor: points to older messages

// Iterate through all history from beginning
const history = await adapter.fetchMessages(threadId, {
  limit: 50,
  direction: 'forward',
});
// history.messages: [oldest, ..., newer] (chronological within page)
// history.nextCursor: points to even newer messages
```

```typescript
type FetchDirection = "forward" | "backward"
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.