> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# PhotonIMessageChannelConfig

> Configuration for .

Configuration for [photonIMessageChannel](/docs/reference/stable/eve/functions/photonIMessageChannel).

## Properties

<ResponseField name={"credentials"} type={"iMessageCredentialProvider"} required>
  Lazy Photon project credentials, such as `connectPhotonCredentials(...)`.
</ResponseField>

<ResponseField name={"events"} type={"ChatSdkChannelEvents<{ imessage: iMessageAdapter }>"}>
  Per-event overrides for the underlying Chat SDK channel.
</ResponseField>

<ResponseField name={"onMessage"} type={"(ctx: PhotonInboundMessageContext, message: Message) => PhotonInboundResultOrPr…"}>
  **Type:** <code>{"(ctx: "}[PhotonInboundMessageContext](/docs/reference/stable/eve/interfaces/PhotonInboundMessageContext){", message: Message) => "}[PhotonInboundResultOrPromise](/docs/reference/stable/eve/types/PhotonInboundResultOrPromise)</code>

  Inbound message policy. Defaults to dispatching every message with no user auth.
</ResponseField>

<ResponseField name={"route"} type={"string"}>
  Override the default webhook route (`/eve/v1/photon`).
</ResponseField>

<ResponseField name={"userName"} type={"string"}>
  Display name used by the Chat SDK runtime. Defaults to `"eve"`.
</ResponseField>

<ResponseField name={"webhookSecret"} type={"string"}>
  Photon webhook signing secret. Falls back to `IMESSAGE_WEBHOOK_SECRET`.
</ResponseField>

<ResponseField name={"webhookVerifier"} type={"iMessageWebhookVerifier"}>
  Trusted webhook verifier. Takes precedence over `webhookSecret`.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.