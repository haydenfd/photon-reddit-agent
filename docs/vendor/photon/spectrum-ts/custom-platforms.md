> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Building a Custom Platform

> Use definePlatform to plug a new messaging platform into Spectrum

`definePlatform` is the entry point for building your own provider. It takes a platform ID and a definition object, and returns a callable that:

* exposes a `.config()` method for registering the provider on `Spectrum()`
* accepts the app, a [Space](/docs/reference/stable/spectrum-ts/symbols/space), or a [Message](/docs/reference/stable/spectrum-ts/symbols/message) for [narrowing](/docs/spectrum-ts/platform-narrowing)
* carries any `static` properties you declare (like iMessage's effect constants)

The core definition shape is [PlatformDef](/docs/reference/stable/spectrum-ts/symbols/platformdef). You pass the platform ID as the first argument to `definePlatform`. The optional `static` object is an additional `definePlatform` input whose properties are copied onto the returned provider.

## Platform IDs

Platform IDs are stable, developer-facing identifiers. Spectrum exposes the ID on `message.platform` and `__platform`, and uses it for provider registration, webhook routing, telemetry, and environment-variable prefixes.

An ID must start with a lowercase letter and contain only lowercase letters, numbers, and single underscores between segments. In other words, it must match `/^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/`. Examples include `discord`, `whatsapp_business`, and `my_platform`. `definePlatform` rejects invalid IDs instead of silently normalizing them, so names containing uppercase letters, spaces, or hyphens must be corrected by the platform author.

## Shape

```ts theme={null}
import { definePlatform } from "spectrum-ts";
import z from "zod";

export const myPlatform = definePlatform("my_platform", {
  // Validate provider config
  config: z.object({
    apiKey: z.string(),
  }),

  // Resolve a user from a string ID
  user: {
    resolve: async ({ input, client }) => ({
      id: input.userID,
      displayName: await client.lookupUser(input.userID),
    }),
  },

  // Create a conversation from participants
  space: {
    create: async ({ input, client }) => ({
      id: await client.findOrCreateConversation(input.users.map(u => u.id)),
    }),
  },

  // Client lifecycle
  lifecycle: {
    createClient: async ({ config, store }) => new MyPlatformClient(config.apiKey),
    destroyClient: async ({ client }) => { await client.disconnect(); },
  },

  // Inbound message stream
  async *messages({ client }) {
    for await (const msg of client.onMessage()) {
      yield {
        id: msg.id,
        content: { type: "text", text: msg.body },
        sender: { id: msg.authorId },
        space: { id: msg.channelId },
        timestamp: new Date(msg.ts),
      };
    }
  },

  // Outbound dispatcher — all content types flow through here
  send: async ({ space, content, client }) => {
    switch (content.type) {
      case "text":
        return await client.send(space.id, content.text);
      case "reaction":
        return await client.react(space.id, content.target.id, content.emoji);
      case "reply":
        return await client.reply(space.id, content.target.id, content.content);
      case "typing":
        await client.setTyping(space.id, content.state === "start");
        return;
    }
  },

  // Optional static properties
  static: {
    reactions: { thumbsUp: "+1", thumbsDown: "-1" } as const,
  },
});
```

## Field reference

Return a [ProviderMessageRecord](/docs/reference/stable/spectrum-ts/symbols/providermessagerecord) from `send` when the content produces a message. Return `undefined` for fire-and-forget signals.

<AccordionGroup>
  <Accordion title="PlatformDef">
    [PlatformDef reference](/docs/reference/stable/spectrum-ts/symbols/platformdef)
  </Accordion>

  <Accordion title="Nested definition fields" description="Configure platform resolution, lifecycle hooks, schemas, and actions.">
    | Field | Required | Description |
    | - | - | - |
    | `user.resolve` | Yes | Resolves a user from a string ID. Returns at minimum `{ id: string }`. |
    | `user.schema` | No | Adds provider-specific user properties with a Zod schema. |
    | `space.create` | Yes | Creates a conversation from participants. Receives an array of users plus optional params. |
    | `space.get` | No | Hydrates a space from a known provider ID. When omitted, Spectrum builds `{ id }` and validates it against `space.schema`. Providers whose schemas require more fields must implement this method. |
    | `space.schema` | No | Adds provider-specific properties to resolved spaces with a Zod schema. |
    | `space.params` | No | Adds provider-specific parameters to `platform(app).space.create()` and `platform(app).space.get()` with a Zod schema. |
    | `space.actions` | No | Adds async methods to resolved spaces. Spectrum binds each method's first parameter to the space, so callers pass only the remaining arguments. Reserved universal method names are skipped with a warning. |
    | `lifecycle.createClient` | Yes | Creates the provider client. Receives `config`, `projectConfig`, `projectId`, `projectSecret`, and `store`. |
    | `lifecycle.destroyClient` | No | Tears down the client on shutdown. Omit it when the client needs no cleanup. |
    | `message.schema` | No | Adds provider-specific properties to incoming messages with a Zod schema. |
    | `message.actions` | No | Adds async methods to narrowed messages. Spectrum binds each method's first parameter to the message, so callers pass only the remaining arguments. |
    | `actions.getMessage` | No | Fetches a message by ID and powers `space.getMessage(id)`. Spectrum injects `{ client, config, store }` as the first argument. |
    | `actions.getMembers` | No | Lists a space's participants and powers `space.getMembers()`. Spectrum injects `{ client, config, store }` as the first argument. |
    | `actions.getAvatar` | No | Downloads a space's avatar and powers `space.getAvatar()`. Spectrum injects `{ client, config, store }` as the first argument. |
    | `actions.getDisplayName` | No | Reads a space's title and powers `space.getDisplayName()`. Spectrum injects `{ client, config, store }` as the first argument. |
    | `actions.[custom]` | No | Adds a provider-specific method to the narrowed provider instance. Spectrum injects `{ client, config, store }` as the first argument. |
    | `events.[custom]` | No | Adds an event stream exposed on `app.[eventName]` and the narrowed provider instance. |
    | `static` | No | Copies constants onto the provider returned by `definePlatform`. |
  </Accordion>
</AccordionGroup>

## Message direction

Records yielded from `messages` are wrapped as inbound [Message](/docs/reference/stable/spectrum-ts/symbols/message) values. Records returned from `send` are wrapped as outbound messages. When a provider knows a record's actual direction, it can set `direction` on the raw record and Spectrum uses it instead of the wrapping context:

```ts theme={null}
yield {
  id: reactionEvent.id,
  content: {
    type: "reaction",
    emoji: reactionEvent.emoji,
    target: {
      id: reactionEvent.targetId,
      content: { type: "text", text: reactionEvent.targetText },
      direction: "outbound",
      space: { id: reactionEvent.channelId },
    },
  },
  sender: { id: reactionEvent.userId },
  space: { id: reactionEvent.channelId },
};
```

This matters for nested records like reaction targets: the outer reaction is inbound (someone reacted) but the target may be outbound (they reacted to a message you sent). Without `direction`, nested targets default to the outer record's direction.

## Event producers

Every event generator receives `{ client, config, projectConfig, store }` and returns an `AsyncIterable`. The signature is [EventProducer](/docs/reference/stable/spectrum-ts/symbols/eventproducer).

The core `messages` stream lives at the top level of the definition. Optional custom event streams (presence, read receipts, etc.) live inside `events`:

```ts theme={null}
// Top-level — required
async *messages({ client }) { /* ... */ },

// Optional custom events
events: {
  async *presence({ client }) {
    for await (const ev of client.presence()) {
      yield { spaceId: ev.chatId, userId: ev.user, online: ev.online };
    }
  },
},
```

Custom events are auto-wired as flat properties on both the Spectrum instance (`app.presence`) and the narrowed platform instance (`myPlatform(app).presence`).

## Message extras

Declare a `message.schema` to add extra typed fields to every incoming message. The extractor surfaces them through a narrowed message:

```ts theme={null}
message: {
  schema: z.object({
    threadId: z.string().optional(),
    reactions: z.array(z.string()),
  }),
},
```

Use [SchemaMessage](/docs/reference/stable/spectrum-ts/symbols/schemamessage) when you need the message shape in your own types.

## Instance actions

Methods declared in `actions` are projected onto the platform instance returned by `myPlatform(app)`. The framework injects `ctx = { client, config, store }` as the first argument, so callers only pass the trailing args.

Two tiers share the `actions` slot:

* **Platform-wise actions** (`getMessage`, `getMembers`, `getAvatar`, `getDisplayName`) — framework-recognized names. Always present on every platform instance. When omitted, the framework wires a default that throws an [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror).
* **Platform-specific actions** — free-form keys for platform ergonomics (e.g. iMessage's `getAttachment`). Only present when declared.

```ts theme={null}
export const myPlatform = definePlatform("my_platform", {
  // ...
  actions: {
    getMessage: async ({ client }, space, messageId) => {
      return await client.fetchMessage(space.id, messageId);
    },
    lookupThread: async ({ client }, threadId: string) => {
      return await client.getThread(threadId);
    },
  },
});

const mine = myPlatform(app);

const msg = await mine.getMessage(space, "msg-123");

const thread = await mine.lookupThread("thread-456");
```

## Fusor-backed providers

When your platform receives inbound messages through webhooks (rather than a persistent connection), use `fusor(...)` as the client in `lifecycle.createClient`. A Fusor client handles webhook signature verification and delivers parsed payloads to a [FusorMessages](/docs/reference/stable/spectrum-ts/symbols/fusormessages) handler:

```ts theme={null}
import { definePlatform, fusor } from "spectrum-ts";
import z from "zod";

export const myWebhookPlatform = definePlatform("my_webhook_platform", {
  config: z.object({
    webhookSecret: z.string(),
  }),

  lifecycle: {
    createClient: async ({ config }) =>
      fusor("my_webhook_platform", (req) => {
        verifySignature(req.rawBody, req.headers, config.webhookSecret);
        return JSON.parse(new TextDecoder().decode(req.rawBody));
      }),
  },

  messages: async ({ payload, respond }) => {
    respond({ status: 200 });
    return {
      id: payload.id,
      content: { type: "text", text: payload.text },
      sender: { id: payload.userId },
      space: { id: payload.chatId },
      timestamp: new Date(payload.ts),
    };
  },

  send: async ({ space, content, config }) => {
    // dispatch outbound messages
  },

  user: {
    resolve: async ({ input }) => ({ id: input.userID }),
  },

  space: {
    create: async ({ input }) => ({ id: input.users[0].id }),
  },
});
```

The Fusor overload of `definePlatform` replaces the top-level `messages` async generator with a per-webhook-delivery handler. It receives a [FusorMessagesCtx](/docs/reference/stable/spectrum-ts/symbols/fusormessagesctx). Call `respond()` to set the HTTP response sent back to the webhook caller.

<Accordion title="FusorMessagesCtx">
  [FusorMessagesCtx reference](/docs/reference/stable/spectrum-ts/symbols/fusormessagesctx)
</Accordion>

## Registering your platform

Exported platforms work like the built-ins — register with `.config()` and use narrowing for the typed surface:

```ts theme={null}
const app = await Spectrum({
  providers: [
    myPlatform.config({ apiKey: process.env.MY_KEY! }),
  ],
});

const mine = myPlatform(app);
const user = await mine.user("user-123");
const space = await mine.space.create(user);

await space.send("Hello from my custom platform.");
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.