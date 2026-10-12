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
  The HTTP middleware address: `host[:port]` or a full `http(s)://` URL
  (e.g. `"imessage.example.com"` or `"http://localhost:8080"`).
</ResponseField>

<ResponseField name={"autoIdempotency"} type={"boolean"}>
  When `true`, adds an `x-idempotency-key` header to mutating calls.
</ResponseField>

<ResponseField name={"retry"} type={"boolean | RetryOptions"}>
  **Type:** <code>{"boolean | "}[RetryOptions](/docs/reference/stable/advanced-imessage/grpc/interfaces/RetryOptions)</code>

  Retries calls the server explicitly marked retryable.
</ResponseField>

<ResponseField name={"server"} type={"string"}>
  Dedicated iMessage instance id (sent as `x-photon-server`): the
  middleware routes every call to that instance instead of the shared
  proxy. Requires a dedicated-mode token the instance accepts. Omit to
  stay on the shared proxy.
</ResponseField>

<ResponseField name={"timeout"} type={"number"}>
  Default per-call timeout in milliseconds.
</ResponseField>

<ResponseField name={"tls"} type={"boolean"}>
  Use HTTPS for bare addresses. Defaults to `true`; set `false` for local development.
</ResponseField>

<ResponseField name={"token"} type={"string | () => Promise<string>"} required>
  Bearer token, or async function that returns a fresh bearer token per call.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.