> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Platform Narrowing

> Recover platform-specific types and actions from unified Spectrum primitives

Every platform provider exports a callable — `imessage`, `localIMessage`,
`slack`, `terminal`, `whatsappBusiness`, `telegram` — that **narrows** generic
Spectrum types into platform-specific ones. The same function handles three
different inputs.

## Narrowing the app

Pass a [SpectrumInstance](/docs/reference/stable/spectrum-ts/symbols/spectruminstance) to get a [PlatformInstance](/docs/reference/stable/spectrum-ts/symbols/platforminstance) for that platform. The platform instance gives you `user()` and `space.create()` / `space.get()` resolvers, plus access to any custom events the provider emits.

```ts theme={null}
import { imessage } from "spectrum-ts/providers/imessage";

const im = imessage(app);

const user = await im.user("+15551234567");
const space = await im.space.create(user);

await space.send("Hello from a new conversation.");
```

If the platform isn't registered in the `providers` array, the type of `imessage(app)` resolves to `never` — the call is a compile-time error.

## Narrowing a space

Pass an existing space to access platform-specific fields:

```ts theme={null}
for await (const [space, message] of app.messages) {
  if (message.platform !== "imessage") continue;

  const imessageSpace = imessage(space);
  if (imessageSpace.type === "group") {
    // group chat logic — `type` only exists on iMessage spaces
  }
}
```

Narrowing a space from the wrong platform logs a structured warning at runtime. Always gate on `message.platform` (or a similar signal) first to avoid unexpected behavior.

The local macOS provider is a separate platform. Gate on
`message.platform === "local_imessage"` and narrow with `localIMessage(...)`;
the cloud provider continues to use `"imessage"` and `imessage(...)`.

## Narrowing a message

Same idea for messages — useful when a provider declares a `message.schema` to attach extra properties:

```ts theme={null}
for await (const [space, message] of app.messages) {
  if (message.platform !== "imessage") continue;
  const imessageMessage = imessage(message);
  // imessageMessage carries any iMessage-specific fields
}
```

## Creating group conversations

`space.create(...)` accepts a single user or an array of users. On iMessage:

```ts theme={null}
const im = imessage(app);
const alice = await im.user("+15551111111");
const bob = await im.user("+15552222222");

const group = await im.space.create([alice, bob]);
await group.send("Welcome to the group.");
```

Some platforms support an additional `params` argument for extra space creation options — the shape of those params is defined per-provider through `space.params` on the platform definition.

## Why narrowing matters

The generic [Space](/docs/reference/stable/spectrum-ts/symbols/space) and [Message](/docs/reference/stable/spectrum-ts/symbols/message) interfaces are deliberately small — just enough to send, react, and reply across every platform. Narrowing is the escape hatch for everything else: typed access to iMessage chat types, WhatsApp phone numbers, or any extra field your [custom platform](/docs/spectrum-ts/custom-platforms) exposes.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.