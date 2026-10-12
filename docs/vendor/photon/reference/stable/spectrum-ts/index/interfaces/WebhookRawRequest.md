> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# WebhookRawRequest

> Raw webhook input for HTTP servers without Web / (Express, raw Node).

Raw webhook input for HTTP servers without Web `Request`/`Response` (Express,
raw Node). `body` MUST be the exact bytes POSTed — never a re-encoded
JSON/text body — so both the protobuf decode (fusor) and the HMAC
verification (native Spectrum webhook) work.

`headers` ARE read for **native Spectrum webhooks**: `X-Spectrum-Signature` /
`X-Spectrum-Timestamp` carry the HMAC verified against
`Spectrum({ webhookSecret })`, and the signature header also selects the
native path. For **fusor** envelopes they are ignored (authenticity is the
per-platform `verify()` reading the inner reconstructed request). The natural
`{ headers: req.headers, body: req.body }` shape works for both.

## Properties

<ResponseField name={"body"} type={"ArrayBuffer | Uint8Array<ArrayBufferLike>"} required />

<ResponseField name={"headers"} type={"Record<string, string>"} />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.