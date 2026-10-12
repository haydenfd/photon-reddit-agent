> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Providers

> Choose, configure, and combine Spectrum platform providers.

SDK providers plug into Spectrum's type system and runtime. Each SDK provider
exports a callable. Call `provider.config(...)` to register it, and call
`provider(app)` or `provider(space)` to
[narrow](/docs/spectrum-ts/platform-narrowing) into its platform-specific instance.

## Platform and provider guides

Most platforms connect through a provider package registered with `config()`.
Voice calls currently connect directly over SIP; the Voice guide lives here
because it is a platform integration, while SDK call control is still on the
roadmap.

<CardGroup cols={2}>
  <Card title="iMessage" icon="comment" href="/docs/spectrum-ts/providers/imessage">
    Use the batteries-included cloud provider, or explicitly install the separate macOS local provider.
  </Card>

  <Card title="Terminal" icon="terminal" href="/docs/spectrum-ts/providers/terminal">
    Run a local chat interface for development, testing, and CLI-style agents.
  </Card>

  <Card title="WhatsApp Business" icon="whatsapp" href="/docs/spectrum-ts/providers/whatsapp-business">
    Use the official WhatsApp Business Cloud API for 1:1 customer conversations.
  </Card>

  <Card title="Voice" icon="phone" href="/docs/spectrum-ts/providers/voice">
    Place and receive calls over SIP using a Spectrum iMessage line.
  </Card>

  <Card title="Telegram" icon="paper-plane" href="/docs/spectrum-ts/providers/telegram">
    Use the Telegram Bot API with Fusor webhooks, media, reactions, replies, typing, and edits.
  </Card>
</CardGroup>

## Combining providers

Call each provider's `config()` method and pass the results to `providers`:

<Tabs>
  <Tab title="Aggregate import">
    ```ts theme={null}
    import { Spectrum } from "spectrum-ts";
    import { imessage, terminal, whatsappBusiness } from "spectrum-ts/providers";

    const app = await Spectrum({
      projectId: "...",
      projectSecret: "...",
      providers: [
        imessage.config(),
        whatsappBusiness.config({
          accessToken: process.env.WA_TOKEN!,
          phoneNumberId: process.env.WA_NUMBER_ID!,
          appSecret: process.env.WA_SECRET!,
        }),
        terminal.config(),
      ],
    });
    ```
  </Tab>

  <Tab title="Individual imports">
    ```ts theme={null}
    import { Spectrum } from "spectrum-ts";
    import { imessage } from "spectrum-ts/providers/imessage";
    import { terminal } from "spectrum-ts/providers/terminal";
    import { whatsappBusiness } from "spectrum-ts/providers/whatsapp-business";

    const app = await Spectrum({
      projectId: "...",
      projectSecret: "...",
      providers: [
        imessage.config(),
        whatsappBusiness.config({
          accessToken: process.env.WA_TOKEN!,
          phoneNumberId: process.env.WA_NUMBER_ID!,
          appSecret: process.env.WA_SECRET!,
        }),
        terminal.config(),
      ],
    });
    ```
  </Tab>
</Tabs>

`app.messages` merges messages from every provider. The `message.platform` field tells you which provider delivered each message.

<Note>
  `@spectrum-ts/imessage-local` is not part of the aggregate import. Install it
  explicitly and import `localIMessage` from its scoped package. Cloud iMessage
  uses the `"imessage"` platform ID; local iMessage uses `"local_imessage"`, so
  a macOS application can register both when it needs both transports.
</Note>

## Writing your own

If none of the built-ins fit, implement a provider with `definePlatform`. See [Building a custom platform](/docs/spectrum-ts/custom-platforms).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.