> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# tracedFetch

> Build a fetch that traces spectrum's OWN outbound HTTP: each request through the returned fetch emits a CLIENT span (tagged with ) and carries W3C trace contex…

Build a fetch that traces spectrum's OWN outbound HTTP: each request through
the returned fetch emits a CLIENT span (tagged with `peer.service`) and
carries W3C trace context downstream. It never mutates `globalThis.fetch`, so
a consumer's unrelated requests stay untouched.

The base delegates to `globalThis.fetch` at call time — deliberately NOT
`createInstrumentedFetch(globalThis.fetch, …)`, which would capture the
original and bypass a test's `spyOn(globalThis, "fetch")`. When telemetry is
off (no `setupOtel`), the tracer is a no-op and this is a transparent
pass-through. Create one per module: `const tf = tracedFetch("…")`.

Pass `redactUrl` to strip secrets from a request URL before it is recorded as
the span's `url.full` (e.g. a token in the path or query); the real request
still uses the original URL. Pair with `sanitizeUrl` for semconv-style query
redaction.

```typescript
const tracedFetch: (peerService: string, options: Pick<FetchSpanOptions, "ignore" | "redactUrl">) => typeof void
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.