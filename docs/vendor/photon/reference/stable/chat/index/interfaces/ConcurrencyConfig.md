> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ConcurrencyConfig

> Fine-grained concurrency configuration.

## Properties

<ResponseField name={"debounceMs"} type={"number"}>
  Debounce window in milliseconds (debounce/burst strategies). Default: 1500.
</ResponseField>

<ResponseField name={"maxConcurrent"} type={"number"}>
  Max concurrent handlers per thread (concurrent strategy). Default: Infinity.
</ResponseField>

<ResponseField name={"maxLockLifetimeMs"} type={"number"}>
  Max total time one handler run may keep renewing its thread lock, in
  milliseconds (drop/queue/debounce/burst strategies). After this, renewal
  stops and the lock lapses at its TTL, so a hung handler cannot block the
  thread forever. Default: 600000 (10 minutes).
</ResponseField>

<ResponseField name={"maxQueueSize"} type={"number"}>
  Max queued messages per thread (queue/burst strategy). Default: 10.
</ResponseField>

<ResponseField name={"onQueueFull"} type={"\"drop-oldest\" | \"drop-newest\""}>
  What to do when queue is full. Default: 'drop-oldest'.
</ResponseField>

<ResponseField name={"queueEntryTtlMs"} type={"number"}>
  TTL for queued entries in milliseconds. Default: 90000 (90s).
</ResponseField>

<ResponseField name={"strategy"} type={"ConcurrencyStrategy"} typeHref={"/reference/stable/chat/index/types/ConcurrencyStrategy"} required>
  The concurrency strategy to use.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.