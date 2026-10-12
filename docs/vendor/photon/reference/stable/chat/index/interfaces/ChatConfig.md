> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChatConfig

> Chat configuration with type-safe adapter inference.

## Properties

<ResponseField name={"adapters"} type={"TAdapters"} required>
  Map of adapter name to adapter instance
</ResponseField>

<ResponseField name={"concurrency"} type={"ConcurrencyStrategy | ConcurrencyConfig"}>
  **Type:** <code>[ConcurrencyStrategy](/docs/reference/stable/chat/index/types/ConcurrencyStrategy){" | "}[ConcurrencyConfig](/docs/reference/stable/chat/index/interfaces/ConcurrencyConfig)</code>

  How to handle messages that arrive while a handler is already
  processing on the same thread.

  * `'drop'` (default) — discard the message (throw `LockError`)
  * `'queue'` — queue the message; when the current handler finishes,
    process only the latest queued message with `context.skipped` containing
    all intermediate messages
  * `'debounce'` — messages inside the debounce window replace the pending
    message; only the final message in that window is processed
  * `'burst'` — wait once before the first handler, then process the
    latest message with `context.skipped` containing earlier burst messages
  * `'concurrent'` — no locking; all messages processed in parallel
  * `ConcurrencyConfig` — fine-grained control over strategy and parameters
</ResponseField>

<ResponseField name={"dedupeTtlMs"} type={"number"}>
  TTL for message deduplication entries in milliseconds.
  Defaults to 300000 (5 minutes). Increase if your webhook cold starts
  cause platform retries that arrive after the default TTL expires.
</ResponseField>

<ResponseField name={"fallbackStreamingPlaceholderText"} type={"string | null"}>
  Placeholder text for fallback streaming (post + edit) adapters.
  Defaults to `"..."`.

  Set to `null` to avoid posting an initial placeholder message and instead
  wait until some real text has been streamed before creating the message.
</ResponseField>

<ResponseField name={"history"} type={"HistoryConfig"} typeHref={"/reference/stable/chat/index/interfaces/HistoryConfig"}>
  Unified history configuration. Supersedes the individual
  `transcripts`, `identity`, `threadHistory`, and `messageHistory` fields.

  * `history.user` — cross-platform per-user message persistence (replaces `transcripts` + `identity`)
  * `history.thread` — per-thread message backfill (replaces `threadHistory` / `messageHistory`)
</ResponseField>

<ResponseField name={"identity"} type={"IdentityResolver"} typeHref={"/reference/stable/chat/index/types/IdentityResolver"} />

<ResponseField name={"lockScope"} type={"LockScope | (context: LockScopeContext) => LockScope | Promise<LockScope>"}>
  **Type:** <code>[LockScope](/docs/reference/stable/chat/index/types/LockScope){" | (context: "}[LockScopeContext](/docs/reference/stable/chat/index/interfaces/LockScopeContext){") => LockScope | Promise<LockScope>"}</code>

  Lock scope determines which messages contend for the same lock.

  * `'thread'`: lock per threadId (default for most adapters)
  * `'channel'`: lock per channelId (default for WhatsApp, Telegram)
  * function: resolve scope dynamically per message (async supported)

  When not set, falls back to the adapter's `lockScope` property,
  then to `'thread'`.
</ResponseField>

<ResponseField name={"logger"} type={"Logger | LogLevel"}>
  **Type:** <code>[Logger](/docs/reference/stable/chat/index/interfaces/Logger){" | "}[LogLevel](/docs/reference/stable/chat/index/types/LogLevel)</code>

  Logger instance or log level.
  Pass "silent" to disable all logging.
</ResponseField>

<ResponseField name={"messageHistory"} type={"{ maxMessages: number; ttlMs: number }"} />

<ResponseField name={"onLockConflict"} type={"\"drop\" | \"force\" | (threadId: string, message: Message) => \"drop\" | \"force\" | P…"}>
  **Type:** <code>{"\"drop\" | \"force\" | (threadId: string, message: "}[Message](/docs/reference/stable/chat/index/classes/Message){") => \"drop\" | \"force\" | Promise<\"drop\" | \"force\">"}</code>
</ResponseField>

<ResponseField name={"state"} type={"StateAdapter"} typeHref={"/reference/stable/chat/index/interfaces/StateAdapter"} required>
  State adapter for subscriptions and locking
</ResponseField>

<ResponseField name={"streamingUpdateIntervalMs"} type={"number"}>
  Update interval for fallback streaming (post + edit) in milliseconds.
  Defaults to 500ms. Lower values provide smoother updates but may hit rate limits.
</ResponseField>

<ResponseField name={"threadHistory"} type={"{ maxMessages: number; ttlMs: number }"} />

<ResponseField name={"transcripts"} type={"TranscriptsConfig"} typeHref={"/reference/stable/chat/index/interfaces/TranscriptsConfig"} />

<ResponseField name={"userName"} type={"string"} required>
  Default bot username across all adapters
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.