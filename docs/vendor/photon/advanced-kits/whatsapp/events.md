> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Events

> Subscribe to inbound messages and status updates with resumable cursors

`client.events.subscribe()` returns an async iterable of every event Meta sends for your business account — inbound messages and delivery status updates. The stream reconnects automatically on failure and buffers missed events while you're offline.

## The event stream

```ts theme={null}
for await (const event of client.events.subscribe()) {
  switch (event.type) {
    case "message":
      // inbound message from a user
      break;
    case "status":
      // status update for a message you sent
      break;
  }
}
```

Every event carries a `cursor` string. The cursor advances with each event — save the most recent one and pass it back on restart to pick up where you left off:

```ts theme={null}
for await (const event of client.events.subscribe({ cursor: lastCursor })) {
  lastCursor = event.cursor;
  await persist(lastCursor); // durable storage
  // handle event...
}
```

## Subscribe options

<Accordion title="SubscribeOptions">
  [SubscribeOptions reference](/docs/reference/stable/whatsapp-business/symbols/subscribeoptions)
</Accordion>

## Inbound messages

When `event.type === "message"`, the event carries an [InboundMessage](/docs/reference/stable/whatsapp-business/symbols/inboundmessage). Narrow on `content.type` before reading content-specific fields:

```ts theme={null}
if (event.type === "message") {
  const { message } = event;

  switch (message.content.type) {
    case "text":
      console.log(message.content.body);
      break;
    case "image":
    case "video":
    case "audio":
    case "document":
      console.log(message.content.media.id);
      const { url } = await client.media.getUrl(message.content.media.id);
      break;
    case "location":
      console.log(message.content.location.latitude);
      break;
    case "reaction":
      console.log(message.content.reaction.emoji);
      break;
    case "interactive":
      // button / list / flow reply — see Interactive messages
      break;
    case "order":
      console.log(message.content.order.productItems);
      break;
  }
}
```

### Inbound content variants

<Accordion title="InboundContent">
  [InboundContent reference](/docs/reference/stable/whatsapp-business/symbols/inboundcontent)
</Accordion>

### Replying to an incoming message

Thread your reply with `replyTo: message.id`:

```ts theme={null}
if (event.type === "message" && event.message.content.type === "text") {
  await client.messages.send({
    to: event.message.from,
    replyTo: event.message.id,
    text: `You said: ${event.message.content.body}`,
  });
}
```

## Status updates

When `event.type === "status"`, the event carries a [StatusUpdate](/docs/reference/stable/whatsapp-business/symbols/statusupdate). The `status` field progresses through `sent → delivered → read` (or `played` for voice notes, or `failed`):

```ts theme={null}
if (event.type === "status") {
  const { status } = event;
  console.log(`${status.id}: ${status.status}`);
  if (status.status === "failed") {
    for (const err of status.errors) {
      console.error(err.code, err.title, err.message);
    }
  }
}
```

`status.bizOpaqueCallbackData` echoes whatever you passed on the original `send()` call — use it to correlate the status back to your own order/ticket/session ID.

## Reconnection

`subscribe()` reconnects automatically. Tune the backoff via `options.reconnect`:

<Accordion title="ReconnectOptions">
  [ReconnectOptions reference](/docs/reference/stable/whatsapp-business/symbols/reconnectoptions)
</Accordion>

```ts theme={null}
client.events.subscribe({
  cursor: lastCursor,
  reconnect: {
    initialDelay: 500,
    maxDelay: 60_000,
    maxAttempts: 10,
    onReconnect: (attempt) => console.log(`reconnect attempt ${attempt}`),
  },
});
```

On reconnect, the stream internally calls `fetchMissedEvents` with the last cursor it saw, so you don't lose events that arrived while you were offline.

## Fetching missed events manually

If your client crashed without draining the stream, fetch missed events on startup before resubscribing:

```ts theme={null}
const { events } = await client.events.fetchMissed({
  cursor: lastCursor,
  limit: 100,
});

for (const event of events) {
  // replay in order
}

// then resume live subscription
for await (const event of client.events.subscribe({ cursor: lastCursor })) {
  // ...
}
```

Missed events are verified against your `app_secret` server-side before being returned — payloads that fail verification are dropped.

## Message context, referrals, errors

Every `InboundMessage` can also carry:

* `context` — reply-to metadata if the user replied to one of your earlier messages.
* `referral` — set when the user arrived via a Click-to-WhatsApp ad.
* `errors` — non-empty when Meta returned a partial error alongside the message.
* `contact` — the sender's display name (when available).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.