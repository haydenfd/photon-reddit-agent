> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# SpectrumPluginOptions

## Properties

<ResponseField name={"app"} type={"WebhookReceiver"} required>
  The Spectrum instance returned by `await Spectrum({...})`.
</ResponseField>

<ResponseField name={"onMessage"} type={"WebhookHandler"} typeHref={"/reference/stable/spectrum-express/types/WebhookHandler"} required>
  Invoked once per inbound message, fire-and-forget after the response — the
  same `(space, message)` contract as `app.webhook(request, handler)`. Covers
  both native Spectrum webhooks and fusor webhooks identically.
</ResponseField>

<ResponseField name={"path"} type={"string"}>
  Route the webhook is mounted on.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.