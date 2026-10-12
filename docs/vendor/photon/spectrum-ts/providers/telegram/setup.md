> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Telegram setup

> Configure the Telegram provider and webhook registration.

Use `telegram.config(...)` with a Telegram bot token.

## Config

```ts theme={null}
telegram.config({
  botToken: "your-bot-token",
});
```

| Option | Description | Env fallback |
| - | - | - |
| `botToken` | Bot token from [@BotFather](https://t.me/BotFather). | `SPECTRUM_TELEGRAM_BOT_TOKEN` |
| `webhookSecret` | Optional secret token for verifying webhook payloads. | `SPECTRUM_TELEGRAM_WEBHOOK_SECRET` |
| `baseUrl` | Optional Bot API base URL. Defaults to `https://api.telegram.org`. | `SPECTRUM_TELEGRAM_BASE_URL` |

## Example

```ts theme={null}
import { Spectrum } from "spectrum-ts";
import { telegram } from "spectrum-ts/providers/telegram";

const app = await Spectrum({
  projectId: process.env.PROJECT_ID!,
  projectSecret: process.env.PROJECT_SECRET!,
  providers: [
    telegram.config({
      botToken: process.env.TELEGRAM_BOT_TOKEN!,
    }),
  ],
});

for await (const [space, message] of app.messages) {
  if (message.content.type === "text") {
    await space.send(`Echo: ${message.content.text}`);
  }
}
```

## Webhook registration

In cloud mode, when `projectId` and `projectSecret` are provided, the Telegram provider automatically registers its Fusor webhook on startup.

In local or direct mode, configure the webhook yourself through the Telegram Bot API.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.