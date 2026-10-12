> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# WhatsApp Business

> Send and receive messages through the WhatsApp Business API.

```ts theme={null}
import { whatsappBusiness } from "spectrum-ts/providers/whatsapp-business";
```

The WhatsApp Business provider wraps the official WhatsApp Business Cloud API. Reactions and threaded replies map to native WhatsApp features.

<Note>
  WhatsApp Business supports **1:1 conversations only**. The API does not expose group management for business accounts. Calling `space.create([userA, userB])` throws.
</Note>

## Explore WhatsApp Business

<CardGroup cols={2}>
  <Card title="Setup" icon="sliders-horizontal" href="/docs/spectrum-ts/providers/whatsapp-business/setup">
    Configure Meta credentials and run a Spectrum message loop.
  </Card>

  <Card title="Conversations" icon="message-circle" href="/docs/spectrum-ts/providers/whatsapp-business/conversations">
    Resolve WhatsApp users and start supported 1:1 conversations.
  </Card>
</CardGroup>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.