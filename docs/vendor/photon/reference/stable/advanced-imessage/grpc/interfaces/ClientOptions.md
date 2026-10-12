> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ClientOptions

> Options for configuring the Advanced iMessage client.

## Properties

<ResponseField name={"address"} type={"string"} required>
  The server address to connect to (e.g., `"localhost:50051"`).
</ResponseField>

<ResponseField name={"autoIdempotency"} type={"boolean"}>
  When `true`, adds an `x-idempotency-key` header to mutating RPCs.
</ResponseField>

<ResponseField name={"channelOptions"} type={"any"}>
  Extra `@grpc/grpc-js` channel options merged onto (and able to override)
  the SDK defaults — including the built-in keepalive settings — for both
  the unary and streaming channels. Tune keepalive here, e.g.
  `{ "grpc.keepalive_time_ms": 15000 }`, without waiting for an SDK release.
</ResponseField>

<ResponseField name={"onHeartbeat"} type={"HeartbeatHandler"} typeHref={"/reference/stable/advanced-imessage/grpc/types/HeartbeatHandler"}>
  Called once for every server heartbeat frame on any `subscribeEvents` /
  `watch` stream. The server emits heartbeats on a fixed cadence even when
  idle, so this is a liveness signal: drive a stall watchdog from it to
  detect a half-open connection and re-establish the stream. Without it,
  heartbeat frames are silently dropped.
</ResponseField>

<ResponseField name={"retry"} type={"boolean | RetryOptions"}>
  **Type:** <code>{"boolean | "}[RetryOptions](/docs/reference/stable/advanced-imessage/grpc/interfaces/RetryOptions)</code>

  Retries retryable unary RPC failures; streaming RPCs are never retried automatically.
</ResponseField>

<ResponseField name={"timeout"} type={"number"}>
  Default unary RPC timeout in milliseconds; streaming RPCs are left open.
</ResponseField>

<ResponseField name={"tls"} type={"boolean"}>
  Use TLS for the gRPC channel. Defaults to `true`; set `false` for local development.
</ResponseField>

<ResponseField name={"token"} type={"string | () => Promise<string>"} required>
  Bearer token, or async function that returns a fresh bearer token per RPC.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.