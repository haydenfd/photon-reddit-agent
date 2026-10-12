> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# sanitizeUrl

```typescript
sanitizeUrl(url: string, options?: SanitizeUrlOptions): string
```

Redact secrets from a URL before it is recorded as a span attribute,
following the OpenTelemetry URL semantic conventions: sensitive
query-parameter values and `user:pass@` credentials are replaced with the
literal `REDACTED`, with the parameter key preserved (`sig=REDACTED`).
Non-sensitive parameters and the path are left intact.

Built to pair with the `redactUrl` fetch option, e.g.
`createInstrumentedFetch(undefined, { redactUrl: (u) => sanitizeUrl(u, { params: ["token"] }) })`.

Unparseable input — and input with nothing to redact — is returned unchanged
(no query-string re-encoding when no secret matched).

## Parameters

<ResponseField name={"url"} type={"string"} required />

<ResponseField name={"options"} type={"SanitizeUrlOptions"} typeHref={"/reference/stable/spectrum-ts/authoring/interfaces/SanitizeUrlOptions"} />

## Returns

`string`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.