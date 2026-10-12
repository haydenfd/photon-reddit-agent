> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Messages

> Receive, narrow, and act on incoming messages

Every incoming message arrives through `app.messages` as a tuple containing a [Space](/docs/reference/stable/spectrum-ts/symbols/space) and a [Message](/docs/reference/stable/spectrum-ts/symbols/message). The space is already bound to the originating conversation — you don't need to resolve it yourself to reply.

## Receiving messages

```ts theme={null}
for await (const [space, message] of app.messages) {
  // handle the message
}
```

Messages from every configured provider merge into this single stream. The order reflects arrival time.

## The Message shape

Every message conforms to [Message](/docs/reference/stable/spectrum-ts/symbols/message).

<Accordion title="Message">
  [Message reference](/docs/reference/stable/spectrum-ts/symbols/message)
</Accordion>

## Narrowing content

[Content](/docs/reference/stable/spectrum-ts/symbols/content) is a discriminated union. Narrow on `message.content.type` before accessing fields:

```ts theme={null}
for await (const [space, message] of app.messages) {
  switch (message.content.type) {
    case "text":
      console.log(message.content.text);
      break;
    case "attachment":
      console.log(
        `${message.content.name} (${message.content.mimeType})`,
        await message.content.read(),
      );
      break;
    case "voice":
      console.log(`voice note (${message.content.duration}s)`);
      break;
    case "contact":
      console.log(message.content.name?.formatted, message.content.phones);
      break;
    case "richlink":
      console.log(message.content.url);
      break;
    case "reaction":
      console.log(`${message.content.emoji} on ${message.content.target.id}`);
      break;
    case "poll":
      console.log(message.content.title, message.content.options);
      break;
    case "poll_option":
      console.log(`vote ${message.content.selected ? "+" : "-"}`, message.content.title);
      break;
    case "group":
      console.log(`group of ${message.content.items.length} items`);
      break;
    case "addMember":
      console.log(`${message.sender?.id ?? "someone"} added ${message.content.members.join(", ")}`);
      break;
    case "custom":
      console.log(message.content.raw);
      break;
  }
}
```

<Accordion title="Content">
  [Content reference](/docs/reference/stable/spectrum-ts/symbols/content)

  [Message reference](/docs/reference/stable/spectrum-ts/symbols/message)

  [Poll reference](/docs/reference/stable/spectrum-ts/symbols/poll)
</Accordion>

Outgoing-only variants like `"effect"` (an iMessage screen effect wrapping inner content) appear on messages you sent and are echoed by the platform; see [iMessage](/docs/spectrum-ts/providers/imessage) for the builder.

Group-management events (`rename`, `avatar`, `addMember`, `removeMember`, `leaveSpace`) arrive with `message.sender` set to the acting user — or `undefined` when the platform recorded no actor — so narrow with `message.sender?.id`. The agent's own actions (e.g. `space.add(...)`) are not echoed back.

`read` is the other bidirectional arm: inbound, it means someone read a message you sent, with `message.sender` the reader and `content.target` your message. See [Read](/docs/spectrum-ts/content/read).

## Filtering out your own messages

Every [Message](/docs/reference/stable/spectrum-ts/symbols/message) carries a `direction`. Skip outbound messages when you only want user input:

```ts theme={null}
for await (const [space, message] of app.messages) {
  if (message.direction === "outbound") continue;
  // handle incoming
}
```

## Acting on a message

Every message is its own context. You can reply, react, or send new content into the space:

```ts theme={null}
for await (const [space, message] of app.messages) {
  await message.react("❤️");
  await message.reply("Got it");
  await space.send("Here's more context");
}
```

See [Content](/docs/spectrum-ts/content) for all the ways to build outgoing messages, and [Reactions and replies](/docs/spectrum-ts/reactions-and-replies) for the details of `react` and `reply`.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.