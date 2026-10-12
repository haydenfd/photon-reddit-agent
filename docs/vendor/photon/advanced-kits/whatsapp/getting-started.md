> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Getting Started

> Connect the WhatsApp Business SDK and send your first message

<Note>
  Most apps should use [Spectrum](/docs/spectrum-ts/getting-started) - it gives you
  a unified, higher-level API across WhatsApp Business, iMessage, and other
  platforms. Reach for `@photon-ai/whatsapp-business` directly only when you
  need low-level WhatsApp control that Spectrum doesn't expose.
</Note>

`@photon-ai/whatsapp-business` is a TypeScript SDK for the WhatsApp Business API. It connects to our managed gRPC gateway, which fronts Meta's Cloud API — you get typed message sending, a resumable event stream, and media handling without wiring webhooks yourself.

## Installation

<CodeGroup>
  ```bash npm theme={null}
  npm install @photon-ai/whatsapp-business
  ```

  ```bash pnpm theme={null}
  pnpm add @photon-ai/whatsapp-business
  ```

  ```bash yarn theme={null}
  yarn add @photon-ai/whatsapp-business
  ```

  ```bash bun theme={null}
  bun add @photon-ai/whatsapp-business
  ```
</CodeGroup>

Requires Node.js 18+ or Bun.

## Credentials

Three values are required. Get them in one of two ways:

<Tabs>
  <Tab title="Spectrum Cloud (one-click)">
    Sign up at [app.photon.codes](https://app.photon.codes), toggle WhatsApp on in your project, finish the guided config, and copy the credentials.

    Use these directly with `createClient`, or pass them to [`spectrum-ts`](/docs/spectrum-ts/getting-started) to combine WhatsApp with iMessage and other platforms behind one unified API.
  </Tab>

  <Tab title="Bring your own Meta app">
    1. Create an app at [developers.facebook.com](https://developers.facebook.com/apps) and add the **WhatsApp** product. ([docs](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started))
    2. Under **WhatsApp → API Setup**, copy your `phone_number_id`.
    3. Generate a **permanent access token** via a System User — the 24-hour token on the API Setup page is not suitable for production:
       1. Open [Business Settings → System users](https://business.facebook.com/settings/system-users), click **Add**, and create a user with **Admin** role.
       2. **Assign assets** → pick your app (enable *Manage app*) and your WhatsApp account (enable *Manage WhatsApp Business Accounts*).
       3. **Generate new token**, select your app, check the `whatsapp_business_messaging`, `whatsapp_business_management`, and `business_management` scopes. Copy the token — it never expires. ([docs](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started))
    4. Under **App Settings → Basic**, copy your `app_secret`.
    5. Under **WhatsApp → Configuration**, set the webhook ([docs](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks)):
       * **Callback URL:** `https://whatsapp-business.spectrum.photon.codes/webhook`
       * **Verify token:** anything (the handshake always returns the challenge)
       * Subscribe to the `messages` field
    6. Pass the three credentials to `createClient`.

    The webhook endpoint is free, public, and shared across developers. You don't register with us, and we never persist your `access_token` or `app_secret`.
  </Tab>
</Tabs>

## Quick start

```ts theme={null}
import { createClient } from "@photon-ai/whatsapp-business";

const client = createClient({
  accessToken: process.env.WA_ACCESS_TOKEN!,
  phoneNumberId: process.env.WA_PHONE_NUMBER_ID!,
  appSecret: process.env.WA_APP_SECRET!,
});

await client.messages.send({
  to: "+15551234567",
  text: "Hello from the SDK!",
});

for await (const event of client.events.subscribe()) {
  if (event.type === "message") {
    console.log(event.message);
  }
}
```

## createClient

```ts theme={null}
const client = createClient(options: ClientOptions): WhatsAppClient;
```

[ClientOptions reference](/docs/reference/stable/whatsapp-business/symbols/clientoptions)

The returned `WhatsAppClient` exposes three resources:

```ts theme={null}
client.messages  // send, markRead
client.events    // subscribe, fetchMissed
client.media     // upload, getUrl, delete
```

## Disposing the client

The client implements `Symbol.asyncDispose`, so `await using` handles teardown automatically:

```ts theme={null}
await using client = createClient({
  accessToken: "...",
  phoneNumberId: "...",
  appSecret: "...",
});
// closed automatically when the block exits
```

Or close it explicitly:

```ts theme={null}
await client.close();
```

## Your first echo bot

```ts theme={null}
import { createClient } from "@photon-ai/whatsapp-business";

const client = createClient({
  accessToken: process.env.WA_ACCESS_TOKEN!,
  phoneNumberId: process.env.WA_PHONE_NUMBER_ID!,
  appSecret: process.env.WA_APP_SECRET!,
});

for await (const event of client.events.subscribe()) {
  if (event.type !== "message") continue;
  if (event.message.content.type !== "text") continue;

  await client.messages.send({
    to: event.message.from,
    text: event.message.content.body,
  });
}
```

* `event.type` is narrowed to `"message"` or `"status"` — only messages get a `.message` field.
* `InboundContent` is a discriminated union; switch on `content.type` before reading fields.
* `event.message.from` is the WhatsApp ID of the sender — pass it straight to `send.to`.

## Reconnection and missed events

The stream reconnects automatically when the connection drops, and fetches any events buffered in the meantime. See [Events](/docs/advanced-kits/whatsapp/events) for cursor management and [Error handling](/docs/advanced-kits/whatsapp/error-handling) for when to retry.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.