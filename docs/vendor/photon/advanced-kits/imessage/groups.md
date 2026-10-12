> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Groups

> Rename groups, manage participants, set group icons, leave groups, and subscribe to group events

`im.groups` covers iMessage group-only operations: display names, participants, group icons, leaving, and group events.

Group methods use the group chat's `chat.guid`. If you only have email addresses or phone numbers, create the group first with [`im.chats.create(...)`](/docs/advanced-kits/imessage/chats).

Direct chats cannot use group APIs. Shared chat features, such as chat creation, read state, typing, and chat backgrounds, are documented under [chats](/docs/advanced-kits/imessage/chats).

## What You Can Do

| Need | Use this when |
| - | - |
| Rename a group | You want to change the group display name |
| Add participants | You want to invite new email addresses or phone numbers |
| Remove participants | You want to remove existing group members |
| Set an icon | You want to use image bytes as the group avatar |
| Download an icon | You need the current custom group avatar |
| Remove an icon | You want to clear the custom group avatar |
| Leave a group | The current account should leave the group |
| Subscribe to events | You need live group name, participant, or icon changes |

## Group Chat GUIDs

Except for `subscribeEvents(...)`, which takes an optional `{ chat }` filter, group methods take the group `chat.guid` as their first argument.

Create or fetch a group chat first:

```ts theme={null}
const { chat: group } = await im.chats.create(["alice@example.com", "bob@example.com"]);
```

Then pass `group.guid` to group operations:

```ts theme={null}
await im.groups.setDisplayName(group.guid, "Weekend");
```

Group chat GUIDs usually look like `any;+;group-id`. Do not pass email addresses, phone numbers, or direct-chat GUIDs to group methods.

## Rename

```ts theme={null}
const updated = await im.groups.setDisplayName(group.guid, "Weekend");
```

Returns the updated `Chat`. The display name is trimmed and must not be empty after trimming.

## Add Participants

```ts theme={null}
const updated = await im.groups.addParticipants(group.guid, ["carol@example.com", "+15551234567"]);
```

Returns the updated `Chat`.

| Input | Rule |
| - | - |
| `chat` | Group `chat.guid` |
| `addresses` | Non-empty array; each item must be a full email address or E.164 phone number |

The server rejects duplicate addresses, addresses that are already in the group, and addresses it cannot resolve.

## Remove Participants

```ts theme={null}
const updated = await im.groups.removeParticipants(group.guid, ["carol@example.com"]);
```

Returns the updated `Chat`.

| Input | Rule |
| - | - |
| `chat` | Group `chat.guid` |
| `addresses` | Non-empty array; each item must already be a participant |

Removing participants usually requires the current account to have permission to manage the group. The server rejects unknown addresses, duplicate addresses, and removals the current account is not allowed to perform.

## Group Icons

Group icons use raw image bytes. They are not attachment GUIDs, and you do not upload them through `im.attachments` first.

### Set an Icon

```ts theme={null}
await im.groups.setIcon(group.guid, await readFile("icon.png"));
```

Returns `void`. `data` must not be empty. The server detects the image type from the bytes. PNG, JPEG, GIF, HEIC, and HEIF are supported.

### Download an Icon

```ts theme={null}
const icon = await im.groups.getIcon(group.guid);

console.log(icon.mimeType, icon.data.byteLength);
```

Returns `GroupIcon`:

```jsonc theme={null}
{
  "data":     [137, 80, 78, 71],  // Uint8Array; raw image bytes
  "mimeType": "image/png"         // Server-detected MIME type
}
```

When no custom icon exists, `getIcon(...)` throws `NotFoundError`, with `error.code === ErrorCode.groupIconNotFound`.

### Remove an Icon

```ts theme={null}
await im.groups.removeIcon(group.guid);
```

Returns `void`. Removing an icon is safe to repeat, even when no custom icon is set.

## Leave a Group

```ts theme={null}
await im.groups.leave(group.guid);
```

Returns `void`.

<Warning>
  `leave(...)` makes the current account leave the group. It cannot rejoin by itself; another participant must invite it again.
</Warning>

<Note>
  Group write methods accept optional `{ clientMessageId }` for idempotent retries from your job system. Most direct calls can omit it. See [error handling](/docs/advanced-kits/imessage/error-handling) for details.
</Note>

## Group Events

`subscribeEvents(...)` returns `TypedEventStream<GroupEvent>`. Use the stream to observe changes made by other people, other devices, or another part of your system. Immediately after your code calls a write method, use that method's `Chat` result or completion status.

### Scope

Only one group:

```ts theme={null}
const stream = im.groups.subscribeEvents({
  chat: group.guid,
});
```

All visible group events:

```ts theme={null}
const stream = im.groups.subscribeEvents();
```

### Outer Event

Every group event has `type: "group.changed"`. The outer fields answer which group changed, who triggered it, and when:

```jsonc theme={null}
{
  "type":       "group.changed",          // Fixed value for group change events
  "chatGuid":   "any;+;group-id",         // Group chat that changed
  "sequence":   123,                      // Event sequence for ordering and catch-up
  "isFromMe":   false,                    // Triggered by the current account
  "occurredAt": "2026-01-01T12:00:00Z",   // Event time
  "actor": {                              // Participant that triggered the event; may be absent
    "address": "alice@example.com",
    "service": "iMessage"
  },
  "change": {                             // The actual group change
    "type": "displayNameChanged",
    "displayName": "Weekend"
  }
}
```

### Change Types

`event.change.type` tells you what changed. Each type carries different fields:

| `event.change.type` | Meaning | Extra fields |
| - | - | - |
| `displayNameChanged` | The group was renamed | `displayName` |
| `participantAdded` | A participant joined | `participant` |
| `participantRemoved` | A participant was removed | `participant` |
| `participantLeft` | A participant left on their own | `participant` |
| `iconChanged` | The group icon was set or replaced | None |
| `iconRemoved` | The group icon was cleared | None |

<CodeGroup>
  ```jsonc displayNameChanged theme={null}
  {
    "type":        "displayNameChanged",  // The group was renamed
    "displayName": "Weekend"              // New group name
  }
  ```

  ```jsonc participantAdded theme={null}
  {
    "type": "participantAdded",           // A participant joined
    "participant": {                      // Participant that joined
      "address": "carol@example.com",
      "service": "iMessage"
    }
  }
  ```

  ```jsonc participantRemoved theme={null}
  {
    "type": "participantRemoved",         // A participant was removed
    "participant": {                      // Participant that was removed
      "address": "carol@example.com",
      "service": "iMessage"
    }
  }
  ```

  ```jsonc participantLeft theme={null}
  {
    "type": "participantLeft",            // A participant left on their own
    "participant": {                      // Participant that left
      "address": "carol@example.com",
      "service": "iMessage"
    }
  }
  ```

  ```jsonc iconChanged theme={null}
  {
    "type": "iconChanged"                 // The group icon was set or replaced
  }
  ```

  ```jsonc iconRemoved theme={null}
  {
    "type": "iconRemoved"                 // The group icon was cleared
  }
  ```
</CodeGroup>

### Handle Events

Switch on `event.change.type`. When you subscribe to one group, you do not need to check `chatGuid` again:

```ts theme={null}
for await (const event of im.groups.subscribeEvents({ chat: group.guid })) {
  switch (event.change.type) {
    case "displayNameChanged":
      console.log(event.change.displayName);
      break;

    case "participantAdded":
    case "participantRemoved":
    case "participantLeft":
      console.log(event.change.type, event.change.participant.address);
      break;

    case "iconChanged":
    case "iconRemoved":
      console.log(event.change.type);
      break;
  }
}
```

When you subscribe to all visible groups, use `event.chatGuid` to identify the group:

```ts theme={null}
for await (const event of im.groups.subscribeEvents()) {
  console.log(event.chatGuid, event.change.type);
}
```

If the stream disconnects, use [events](/docs/advanced-kits/imessage/events) to catch up on missed durable events, then continue consuming the live stream.

## Next Steps

1. [Chats](/docs/advanced-kits/imessage/chats) — create a group chat and get `chat.guid`
2. [Messages](/docs/advanced-kits/imessage/messages) — send messages, attachments, and reactions in a group chat
3. [Events](/docs/advanced-kits/imessage/events) — catch up on durable events after a disconnect
4. [Error Handling](/docs/advanced-kits/imessage/error-handling) — handle `NotFoundError`, `ValidationError`, and idempotent retries


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.