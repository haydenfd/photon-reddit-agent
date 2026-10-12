> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Webhooks

> Receive messages via HTTP instead of a long-lived process

`app.webhook()` lets you receive messages through HTTP `POST` requests instead of the `app.messages` stream. It handles two webhook formats through the same method:

| | Native Spectrum webhook | Fusor webhook |
| - | - | - |
| Body | HMAC-signed, normalized JSON | Protobuf envelope (raw provider request) |
| Auth | HMAC over body, verified with `webhookSecret` | Platform's own signature via provider `verify()` |
| Requires a Fusor provider | No | Yes |

Detection is by payload shape (JSON vs protobuf), not headers. Your handler receives the same `(space, message)` pair either way.

## Configuring a webhook secret

Native Spectrum webhooks require a signing secret for HMAC verification. Pass it to `Spectrum()`:

```ts theme={null}
const app = await Spectrum({
  projectId: process.env.PROJECT_ID!,
  projectSecret: process.env.PROJECT_SECRET!,
  providers: [imessage.config()],
  webhookSecret: process.env.SPECTRUM_WEBHOOK_SECRET,
});
```

The `webhookSecret` option can also be supplied via the `SPECTRUM_WEBHOOK_SECRET` environment variable (the explicit option takes precedence). A native delivery that arrives without a configured secret is answered `500`.

## Receiving deliveries

Call `app.webhook()` from your HTTP server's `POST` route. The method has two overloads:

<Tabs>
  <Tab title="Web Request (Hono / Bun.serve / Workers)">
    ```ts theme={null}
    server.post("/spectrum/webhook", (c) =>
      app.webhook(c.req.raw, async (space, message) => {
        if (message.content.type === "text") {
          await space.send(`echo: ${message.content.text}`);
        }
      })
    );
    ```
  </Tab>

  <Tab title="Raw (Express / Node)">
    ```ts theme={null}
    server.post(
      "/spectrum/webhook",
      express.raw({ type: "*/*" }),
      async (req, res) => {
        const result = await app.webhook(
          { body: req.body, headers: req.headers },
          async (space, message) => {
            if (message.content.type === "text") {
              await space.send(`echo: ${message.content.text}`);
            }
          }
        );
        res.status(result.status).set(result.headers).send(Buffer.from(result.body));
      }
    );
    ```
  </Tab>
</Tabs>

The handler is invoked **fire-and-forget** — it runs after the HTTP response is sent. A throw is logged, never surfaced. Dedupe on `message.id` for exactly-once side effects.

<Warning>
  Pass the raw body bytes. The HMAC is computed over the exact bytes on the wire. If your framework parses the body to JSON and you re-stringify it, the bytes change and verification fails.
</Warning>

## Framework adapters

First-party adapters mount the endpoint for you and handle raw-body parsing correctly. Install the adapter package and its framework only when you use it.

<Tabs>
  <Tab title="Hono">
    ```ts theme={null}
    import { Hono } from "hono";
    import { Spectrum } from "spectrum-ts";
    import { imessage } from "spectrum-ts/providers/imessage";
    import { spectrum } from "@spectrum-ts/hono";

    const app = await Spectrum({
      projectId: process.env.PROJECT_ID!,
      projectSecret: process.env.PROJECT_SECRET!,
      providers: [imessage.config()],
      webhookSecret: process.env.SPECTRUM_WEBHOOK_SECRET,
    });

    const server = new Hono().route(
      "/",
      spectrum({
        app,
        onMessage: async (space, message) => {
          if (message.content.type === "text") {
            await space.send(`echo: ${message.content.text}`);
          }
        },
      })
    );

    export default server;
    ```

    <Accordion title="SpectrumPluginOptions">
      [SpectrumPluginOptions reference](/docs/reference/stable/spectrum-hono/symbols/spectrumpluginoptions)
    </Accordion>
  </Tab>

  <Tab title="Express">
    ```ts theme={null}
    import express from "express";
    import { Spectrum } from "spectrum-ts";
    import { imessage } from "spectrum-ts/providers/imessage";
    import { spectrum } from "@spectrum-ts/express";

    const app = await Spectrum({
      projectId: process.env.PROJECT_ID!,
      projectSecret: process.env.PROJECT_SECRET!,
      providers: [imessage.config()],
      webhookSecret: process.env.SPECTRUM_WEBHOOK_SECRET,
    });

    const server = express();

    server.use(
      spectrum({
        app,
        onMessage: async (space, message) => {
          if (message.content.type === "text") {
            await space.send(`echo: ${message.content.text}`);
          }
        },
      })
    );

    server.use(express.json());
    server.listen(3000);
    ```

    Mount the adapter **before** any global `express.json()`. A global JSON parser consumes the body stream first, breaking signature verification.

    <Accordion title="SpectrumPluginOptions">
      [SpectrumPluginOptions reference](/docs/reference/stable/spectrum-express/symbols/spectrumpluginoptions)
    </Accordion>
  </Tab>

  <Tab title="Elysia">
    ```ts theme={null}
    import { Elysia } from "elysia";
    import { Spectrum } from "spectrum-ts";
    import { imessage } from "spectrum-ts/providers/imessage";
    import { spectrum } from "@spectrum-ts/elysia";

    const app = await Spectrum({
      projectId: process.env.PROJECT_ID!,
      projectSecret: process.env.PROJECT_SECRET!,
      providers: [imessage.config()],
      webhookSecret: process.env.SPECTRUM_WEBHOOK_SECRET,
    });

    new Elysia()
      .use(
        spectrum({
          app,
          onMessage: async (space, message) => {
            if (message.content.type === "text") {
              await space.send(`echo: ${message.content.text}`);
            }
          },
        })
      )
      .listen(3000);
    ```

    <Accordion title="SpectrumPluginOptions">
      [SpectrumPluginOptions reference](/docs/reference/stable/spectrum-elysia/symbols/spectrumpluginoptions)
    </Accordion>
  </Tab>
</Tabs>

## What the SDK handles

* **Signature verification.** Native webhooks are verified with `HMAC-SHA256` over `v0:<timestamp>:<rawBody>`, with a 5-minute replay window. Bad signature returns `401`, missing headers return `400`.
* **Payload deserialization.** Native webhook JSON is deserialized into normal [Message](/docs/reference/stable/spectrum-ts/symbols/message) and [Space](/docs/reference/stable/spectrum-ts/symbols/space) objects, including reactions and grouped items.
* **Attachment rehydration.** Native webhooks carry attachment metadata only. `read()` and `stream()` fetch the bytes lazily via the platform.
* **Format detection.** Native vs Fusor is detected per request by payload shape — JSON for native, protobuf for Fusor.

## Delivery semantics

`app.webhook()` is stateless and request-scoped — it does **not** feed `app.messages`, and it never opens the streaming connection. Both formats deliver at-least-once, so dedupe on `message.id` for exactly-once side effects.

For more on Spectrum's webhook delivery model, see the [Webhooks documentation](/docs/webhooks/overview).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.