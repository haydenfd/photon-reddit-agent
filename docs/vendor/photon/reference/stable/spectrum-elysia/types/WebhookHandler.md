> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# WebhookHandler

> Request-scoped handler invoked once per inbound message that resolves.

Request-scoped handler invoked once per inbound message that
`spectrum.webhook()` resolves. Receives the same fully-built `[space,
message]` pair that `spectrum.messages` yields.

Runs **fire-and-forget**: it is dispatched after the HTTP response (the
platform's `respond()` reply) has already been computed, so its outcome never
affects the response, and a throw is caught + logged rather than surfaced —
mirroring the body of a `for await (… of spectrum.messages)` loop.

On a long-running server the event loop keeps the handler alive. On
serverless/edge runtimes the function may be frozen once the response is
returned, so keeping background work alive is the caller's responsibility —
the usual pattern is to enqueue the work and process it in a separate worker.

```typescript
type WebhookHandler = (space: Space, message: Message) => void | Promise<void>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.