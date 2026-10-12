> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Getting Started

> Install spectrum-ts and send your first message across platforms

`spectrum-ts` is a unified messaging SDK for TypeScript. Write your logic once, deliver it across every platform — iMessage, WhatsApp Business, your terminal, or a custom platform you build yourself.

## Installation

`spectrum-ts` is the batteries-included package for the standard provider set.
The macOS-only local iMessage adapter is intentionally separate so its native
Messages database dependencies are never installed in cloud applications.

<CodeGroup>
  ```bash npm theme={null}
  npm install spectrum-ts
  ```

  ```bash pnpm theme={null}
  pnpm add spectrum-ts
  ```

  ```bash yarn theme={null}
  yarn add spectrum-ts
  ```

  ```bash bun theme={null}
  bun add spectrum-ts
  ```
</CodeGroup>

For a leaner install, depend on `@spectrum-ts/core` plus only the providers you need:

```bash theme={null}
bun add @spectrum-ts/core @spectrum-ts/imessage @spectrum-ts/telegram
```

Either way, the `spectrum-ts/providers/<platform>` import paths work as long as the matching provider package is installed.

Local iMessage is the exception: install and import it explicitly. It has no
`spectrum-ts/providers/imessage-local` compatibility path.

```bash theme={null}
bun add spectrum-ts @spectrum-ts/imessage-local
```

```ts theme={null}
import { Spectrum } from "spectrum-ts";
import { localIMessage } from "@spectrum-ts/imessage-local";

const app = await Spectrum({
  providers: [localIMessage.config()],
});
```

Requires TypeScript 5 or later (TypeScript 6 is also supported).

## Core concepts

Spectrum is built around four primitives:

| Primitive | What it represents |
| - | - |
| [Message](/docs/reference/stable/spectrum-ts/symbols/message) | An incoming piece of content — text, attachments, or structured data — from any platform. |
| [Space](/docs/reference/stable/spectrum-ts/symbols/space) | A conversation context. A DM, a group chat, a terminal session. You send messages *into* a space. |
| [User](/docs/reference/stable/spectrum-ts/symbols/user) | A participant on a platform, identified by a platform-specific ID. |
| **Platform provider** | A platform adapter (iMessage, terminal, WhatsApp, or your own) that translates platform-specific protocols into Spectrum's unified interface. |

Every message arrives as a tuple containing a [Space](/docs/reference/stable/spectrum-ts/symbols/space) and a [Message](/docs/reference/stable/spectrum-ts/symbols/message). The space gives you the ability to respond; the message gives you the content and metadata.

## Quickstart

### Get your credentials

Find your `PROJECT_ID` and `SECRET_KEY` in your project **Settings** on the [dashboard](https://app.photon.codes/).

You can pass these to `Spectrum(...)` directly, or omit them and let Spectrum
read `SPECTRUM_PROJECT_ID` and `SPECTRUM_PROJECT_SECRET` from the environment.
The same explicit-wins-over-env fallback applies to `webhookSecret` (`SPECTRUM_WEBHOOK_SECRET`)
and to every provider's config.

Provider config fallbacks are automatic and convention-based: any text config
field can be supplied through the environment as `SPECTRUM_<PLATFORM>_<FIELD>`,
where `<PLATFORM>` is the provider's id upper-cased (spaces and punctuation become
`_`) and `<FIELD>` is the config key in `UPPER_SNAKE_CASE`. For example
Telegram's `botToken` reads from `SPECTRUM_TELEGRAM_BOT_TOKEN`, and WhatsApp
Business's `phoneNumberId` reads from `SPECTRUM_WHATSAPP_BUSINESS_PHONE_NUMBER_ID`.
Explicit config always wins over the environment — see the provider setup pages
for each field's env var name.

### Run your first app

```ts theme={null}
import { Spectrum } from "spectrum-ts";
import { imessage } from "spectrum-ts/providers/imessage";

const app = await Spectrum({
  projectId: "your-project-id",
  projectSecret: "your-project-secret",
  providers: [
    imessage.config(),
  ],
});

for await (const [space, message] of app.messages) {
  if (message.content.type === "text") {
    console.log(`[${message.platform}] ${message.sender?.id ?? "unknown"}: ${message.content.text}`);
    await space.send("hello world");
  }
}
```

Projectless providers (like `terminal`) can be used without credentials:

```ts theme={null}
import { Spectrum } from "spectrum-ts";
import { terminal } from "spectrum-ts/providers/terminal";

const app = await Spectrum({
  providers: [terminal.config()],
});
```

## The app instance

`Spectrum()` returns a [SpectrumInstance](/docs/reference/stable/spectrum-ts/symbols/spectruminstance) — an object that merges a message stream with platform-specific custom event streams.

```ts theme={null}
app.messages
await app.send(space, ...)   // send into a space
await app.responding(space, fn)  // run fn with a typing indicator
await app.webhook(req, handler)  // handle an inbound webhook delivery
await app.stop()             // graceful shutdown
```

`app.messages` is an `AsyncIterable` of tuples containing a [Space](/docs/reference/stable/spectrum-ts/symbols/space) and a [Message](/docs/reference/stable/spectrum-ts/symbols/message).

Custom events emitted by providers are exposed as flat async iterables on the same object — see [Custom events and lifecycle](/docs/spectrum-ts/custom-events-and-lifecycle).

`app.webhook()` handles both native Spectrum webhooks and Fusor webhooks through the same method. See [Webhooks](/docs/spectrum-ts/webhooks) for setup and framework adapters.

## Multi-platform in three lines

Combine providers to receive and send across platforms simultaneously:

```ts theme={null}
import { Spectrum } from "spectrum-ts";
import { imessage } from "spectrum-ts/providers/imessage";
import { terminal } from "spectrum-ts/providers/terminal";

const app = await Spectrum({
  projectId: process.env.PROJECT_ID!,
  projectSecret: process.env.PROJECT_SECRET!,
  providers: [
    imessage.config(),
    terminal.config(),
  ],
});

for await (const [space, message] of app.messages) {
  await space.responding(async () => {
    await message.reply("Hello from Spectrum.");
  });
}
```

Messages from every provider merge into the single `app.messages` stream. The `message.platform` field identifies the source.

## Logging

Spectrum emits structured logs across the core runtime and providers. The default log level is `info`. Control the verbosity with `logLevel`:

```ts theme={null}
const app = await Spectrum({
  projectId: process.env.PROJECT_ID!,
  projectSecret: process.env.PROJECT_SECRET!,
  providers: [imessage.config()],
  options: { logLevel: "debug" },
});
```

An explicit `logLevel` takes precedence over the `LOG_LEVEL` environment variable.

Log output is sanitized — sensitive fields like tokens and secrets are redacted from error attributes before they reach any log destination.

## Telemetry

Spectrum has built-in [OpenTelemetry](https://opentelemetry.io/) instrumentation. Enable it by passing `telemetry: true`:

```ts theme={null}
const app = await Spectrum({
  projectId: process.env.PROJECT_ID!,
  projectSecret: process.env.PROJECT_SECRET!,
  providers: [imessage.config()],
  telemetry: true,
});
```

When enabled, Spectrum traces initialization, provider setup, message send/receive/get flows, space resolution, and custom events. Each span includes attributes like the provider name, space ID, content type, and sender kind.

Traces are sent to the Photon OTLP endpoint by default. Standard `OTEL_EXPORTER_OTLP_*` environment variables override the default endpoint and headers.

Calling `app.stop()` flushes any pending telemetry data before shutting down.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.