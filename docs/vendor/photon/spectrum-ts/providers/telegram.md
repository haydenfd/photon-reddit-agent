> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Telegram

> Send and receive messages through the Telegram Bot API.

```ts theme={null}
import { telegram } from "spectrum-ts/providers/telegram";
```

It connects your agent to the Telegram Bot API. Inbound messages are delivered through Fusor webhooks. Outbound messages use the Bot API directly. The provider supports text, media, reactions, replies, typing indicators, edits, and lazy media downloads.

## Explore Telegram

<CardGroup cols={2}>
  <Card title="Setup" icon="sliders-horizontal" href="/docs/spectrum-ts/providers/telegram/setup">
    Configure a bot token, register webhooks, and run an echo loop.
  </Card>

  <Card title="Conversations and features" icon="message-circle" href="/docs/spectrum-ts/providers/telegram/conversations-and-features">
    Start Telegram chats and see which content features the provider supports.
  </Card>
</CardGroup>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.