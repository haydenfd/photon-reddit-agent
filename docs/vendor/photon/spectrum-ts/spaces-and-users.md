> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Spaces and Users

> Send messages, manage typing indicators, and resolve participants

A **space** is a conversation — a DM, a group chat, a terminal session. A **user** is a participant identified by a platform-specific ID. Both carry a `__platform` tag so the narrowing functions from [platform narrowing](/docs/spectrum-ts/platform-narrowing) can recover their platform-specific shapes.

## Space

Every [Space](/docs/reference/stable/spectrum-ts/symbols/space) exposes the same interface regardless of platform:

<Accordion title="Space">
  [Space reference](/docs/reference/stable/spectrum-ts/symbols/space)
</Accordion>

Provider-specific constraints surface as an [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror).

```ts theme={null}
for await (const [space, message] of app.messages) {
  await space.send("Got it.");
}
```

## User

Every [User](/docs/reference/stable/spectrum-ts/symbols/user) has a platform-specific ID and platform tag.

<Accordion title="User">
  [User reference](/docs/reference/stable/spectrum-ts/symbols/user)
</Accordion>

Resolve a user from a platform-specific identifier through a narrowed platform instance:

```ts theme={null}
import { imessage } from "spectrum-ts/providers/imessage";

const im = imessage(app);
const alice = await im.user("+15551234567");
```

The returned user may include additional platform-specific fields when the provider defines a `user.schema`.

## Typing indicators

### Manual

```ts theme={null}
await space.startTyping();
// ... do work ...
await space.stopTyping();
```

These are sugar for `space.send(typing("start"))` and `space.send(typing("stop"))` — see [Typing indicators](/docs/spectrum-ts/content/typing-indicators) for the canonical form.

### Automatic with `responding`

`responding` is the recommended pattern. It guarantees the typing indicator is cleared even if the inner function throws:

```ts theme={null}
await space.responding(async () => {
  const result = await generateResponse(message);
  await space.send(result);
});
```

The helper is also available on the app itself:

```ts theme={null}
await app.responding(space, async () => {
  await space.send("Thinking...");
});
```

## Creating a space

To start a new conversation, use [platform narrowing](/docs/spectrum-ts/platform-narrowing) to get a platform instance, then call `space.create(...)` with the users:

```ts theme={null}
const im = imessage(app);
const alice = await im.user("+15551111111");
const bob = await im.user("+15552222222");

// DM
const dm = await im.space.create(alice);

// Group
const group = await im.space.create([alice, bob]);

await group.send("Welcome to the group.");
```

To look up an existing conversation by its platform ID, use `space.get(id)`:

```ts theme={null}
const existing = await im.space.get("any;-;+15551111111");
await existing.send("Hello again.");
```

The returned space is the platform-specific type — so you can read extra fields like `type: "dm" | "group"` on iMessage — but it also satisfies the generic [Space](/docs/reference/stable/spectrum-ts/symbols/space) interface, so `send()`, `startTyping()`, and friends are always available.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.