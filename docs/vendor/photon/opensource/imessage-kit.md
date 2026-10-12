> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# imessage-kit

> Open-source, type-safe iMessage SDK for macOS — send, query, watch, and automate

`@photon-ai/imessage-kit` is an MIT-licensed, macOS-only SDK that talks directly to the local Messages database and AppleScript bridge. Use it when you want to read, send, and automate iMessage on a Mac you control — automation tools, AI agents, chat-first apps.

<Note>
  This SDK is for talking to iMessage **locally on a Mac you control**. If you
  want remote/hosted iMessage delivery, threaded replies, tapbacks, edits /
  unsends, and live typing indicators, use
  [Spectrum](/docs/spectrum-ts/getting-started) for a unified API across platforms,
  or [`@photon-ai/advanced-imessage`](/docs/advanced-kits/imessage/getting-started)
  when you need low-level iMessage control.
</Note>

## Requirements

* **OS**: macOS only (reads the Messages SQLite database directly).
* **Runtime**: Node.js ≥ 20 or Bun ≥ 1.0.
* **Permission**: the process must have **Full Disk Access** granted. Open **System Settings → Privacy & Security → Full Disk Access** and add your terminal or IDE (Terminal, iTerm2, Warp, VS Code, Cursor…).

## Install

<CodeGroup>
  ```bash Bun theme={null}
  bun add @photon-ai/imessage-kit
  ```

  ```bash npm theme={null}
  npm install @photon-ai/imessage-kit better-sqlite3
  ```
</CodeGroup>

On Bun the SDK has zero runtime dependencies. On Node it uses `better-sqlite3` as an optional peer dependency.

## Quick start

```ts theme={null}
import { IMessageSDK } from "@photon-ai/imessage-kit";

const sdk = new IMessageSDK();

await sdk.send("+1234567890", "Hello from iMessage Kit!");

await sdk.close();
```

The constructor takes an optional [IMessageConfig](/docs/reference/stable/imessage-kit/symbols/imessageconfig) — override the default Messages database path, concurrent-send limit, debug logging, webhooks, and plugins.

<Accordion title="IMessageConfig">
  [IMessageConfig reference](/docs/reference/stable/imessage-kit/symbols/imessageconfig)
</Accordion>

## Sending

`sdk.send(to, content)` auto-detects whether `to` is a recipient (phone number / email) or a `chatId` (group or DM).

### Text

```ts theme={null}
await sdk.send("+1234567890", "Hello World!");
await sdk.send("user@example.com", "Hello!");
```

### Images and files

```ts theme={null}
// Images (auto-selects iMessage image handling)
await sdk.send("+1234567890", { images: ["/path/to/photo.jpg"] });

// Arbitrary files
await sdk.send("+1234567890", { files: ["/path/to/document.pdf"] });

// Text + attachments
await sdk.send("+1234567890", {
  text: "Check this out!",
  images: ["/path/to/photo.jpg"],
  files: ["/path/to/report.pdf"],
});

// Convenience wrappers
await sdk.sendFile("+1234567890", "/path/to/document.pdf");
await sdk.sendFiles("+1234567890", ["/file1.pdf", "/file2.csv"], "Multiple files");
```

### Groups

Group `chatId`s are returned by `listChats()`:

```ts theme={null}
const groups = await sdk.listChats({ type: "group" });
const chatId = groups[0].chatId;

await sdk.send(chatId, "Hello group!");
await sdk.send(chatId, { text: "Check these files", files: ["/report.pdf"] });
```

### Batch

```ts theme={null}
const results = await sdk.sendBatch([
  { to: "+1234567890", content: "Hi Alice" },
  { to: "+0987654321", content: "Hi Bob" },
]);

for (const r of results) {
  if (r.success) console.log("Sent to", r.to);
  else console.error("Failed", r.to, r.error);
}
```

Concurrency is controlled by `maxConcurrentSends` from the SDK config.

## Querying messages

```ts theme={null}
const result = await sdk.getMessages({
  sender: "+1234567890",
  unreadOnly: true,
  limit: 20,
  since: new Date("2026-01-01"),
  search: "meeting",
});
```

Returns a [MessageQueryResult](/docs/reference/stable/imessage-kit/symbols/messagequeryresult). Each entry is a [Message](/docs/reference/stable/imessage-kit/symbols/message).

<Accordion title="MessageFilter">
  [MessageFilter reference](/docs/reference/stable/imessage-kit/symbols/messagefilter)
</Accordion>

### Unread messages

`getUnreadMessages()` groups results by sender:

```ts theme={null}
const unread = await sdk.getUnreadMessages();
console.log(`${unread.total} unread messages from ${unread.senderCount} senders`);

for (const group of unread.groups) {
  console.log(`${group.sender}: ${group.messages.length} messages`);
}
```

## Listing chats

```ts theme={null}
const all = await sdk.listChats();

const groups = await sdk.listChats({
  type: "group",
  hasUnread: true,
  sortBy: "recent",
  search: "Project",
  limit: 20,
});

for (const chat of groups) {
  console.log(chat.chatId, chat.displayName, chat.unreadCount);
}
```

Returns an array of [ChatSummary](/docs/reference/stable/imessage-kit/symbols/chatsummary).

<Accordion title="ListChatsOptions">
  [ListChatsOptions reference](/docs/reference/stable/imessage-kit/symbols/listchatsoptions)
</Accordion>

## Real-time watching

```ts theme={null}
await sdk.startWatching({
  onMessage: (msg) => console.log(`New: ${msg.text}`),
  onDirectMessage: (msg) => console.log(`DM from ${msg.sender}`),
  onGroupMessage: (msg) => console.log(`Group: ${msg.chatId}`),
  onError: (err) => console.error(err),
});

// Later
sdk.stopWatching();
```

The watcher polls the Messages database and fires per registered callback — see [WatcherEvents](/docs/reference/stable/imessage-kit/symbols/watcherevents) for every available hook.

### Auto-reply with the message chain

`sdk.message(msg)` returns a [MessageChain](/docs/reference/stable/imessage-kit/symbols/messagechain) — a fluent builder for filter-then-respond patterns:

```ts theme={null}
await sdk.startWatching({
  onDirectMessage: async (msg) => {
    await sdk.message(msg).ifFromOthers().matchText(/hello/i).replyText("Hi there!").execute();
  },
});
```

Chain guards to skip tapbacks, filter by chat kind, match on predicates, and choose a response:

```ts theme={null}
await sdk
  .message(msg)
  .ifUnread()
  .ifNotReaction()
  .ifGroupChat()
  .when((m) => (m.sender ?? "").startsWith("+1"))
  .matchText(/photo/i)
  .replyImage(["/photo.jpg"])
  .execute();
```

## Attachment helpers

```ts theme={null}
import {
  attachmentExists,
  downloadAttachment,
  getAttachmentExtension,
  getAttachmentMetadata,
  getAttachmentSize,
  isAudioAttachment,
  isImageAttachment,
  isVideoAttachment,
  readAttachment,
} from "@photon-ai/imessage-kit";

const { messages } = await sdk.getMessages({ hasAttachments: true, limit: 1 });
const attachment = messages[0].attachments[0];

if (await attachmentExists(attachment)) {
  const size = await getAttachmentSize(attachment);
  const ext = getAttachmentExtension(attachment);

  if (isImageAttachment(attachment)) {
    // Stream or buffer the bytes
    const bytes = await readAttachment(attachment);
    await downloadAttachment(attachment, "/path/to/save.jpg");
  }
}
```

Each attachment is an [Attachment](/docs/reference/stable/imessage-kit/symbols/attachment).

### Common media formats

Messages carries a wide range of formats through without transcoding. The SDK's `isImage` / `isVideo` / `isAudio` helpers classify by the stored MIME type — there's no allowlist.

| Category | Typical formats |
| - | - |
| Documents | PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, RTF |
| Images | JPG, PNG, GIF, HEIC, WEBP, AVIF |
| Contacts | VCF (vCard) |
| Data | CSV, JSON, XML |
| Archives | ZIP, RAR, 7Z |
| Media | MP4, MOV, MP3, M4A |

## Scheduling

### `MessageScheduler`

```ts theme={null}
import { IMessageSDK, MessageScheduler } from "@photon-ai/imessage-kit";

const sdk = new IMessageSDK();
const scheduler = new MessageScheduler(
  sdk,
  { debug: true },
  {
    onSent: (task: any, result: any) => console.log(`Sent: ${task.id}`),
    onError: (task: any, error: Error) => console.error(`Failed: ${error.message}`),
    onComplete: (task: any) => console.log(`Completed: ${task.id}`),
  },
);

const id = scheduler.schedule({
  to: "+1234567890",
  content: "Reminder!",
  sendAt: new Date(Date.now() + 5 * 60_000),
});

scheduler.scheduleRecurring({
  to: "+1234567890",
  content: "Good morning!",
  startAt: new Date("2026-01-01T08:00:00"),
  interval: "daily",
  endAt: new Date("2026-12-31"),
});

scheduler.reschedule(id, new Date(Date.now() + 60_000));
scheduler.cancel(id);
scheduler.getPending();

scheduler.destroy();
```

The constructor takes `(sdk, config?, events?)` — three positional args. Config is [SchedulerConfig](/docs/reference/stable/imessage-kit/symbols/schedulerconfig); one-shot task shape is [ScheduleOptions](/docs/reference/stable/imessage-kit/symbols/scheduleoptions) and recurring is [RecurringScheduleOptions](/docs/reference/stable/imessage-kit/symbols/recurringscheduleoptions). The scheduler loop is internal — no `start()` call needed.

### `Reminders` — natural-language scheduling

```ts theme={null}
import { IMessageSDK, Reminders } from "@photon-ai/imessage-kit";

const sdk = new IMessageSDK();
const reminders = new Reminders(sdk);

reminders.in("5 minutes", "+1234567890", "Take a break!");
reminders.in("2 hours", "+1234567890", "Call the client");
reminders.at("5pm", "+1234567890", "End of day review");
reminders.at("tomorrow 9am", "+1234567890", "Morning standup");
reminders.exact(new Date("2026-12-25T10:00:00"), "+1234567890", "Merry Christmas!");

reminders.list();
reminders.cancel("reminder-id");
reminders.destroy();
```

All scheduling calls take an optional [ReminderOptions](/docs/reference/stable/imessage-kit/symbols/reminderoptions).

Supported expressions:

* **Duration**: `"5 minutes"`, `"2 hours"`, `"1 day"`, `"30 seconds"`, `"1 week"`
* **Time**: `"5pm"`, `"5:30pm"`, `"17:30"`
* **Day + time**: `"tomorrow 9am"`, `"friday 2pm"`

## Plugins

```ts theme={null}
import { definePlugin, loggerPlugin } from "@photon-ai/imessage-kit";

sdk.use(loggerPlugin({ level: "info", colored: true }));

sdk.use(
  definePlugin({
    name: "my-plugin",
    onInit: async () => console.log("Initialized"),
    onBeforeSend: async (to, content) => console.log("Sending to:", to, content),
    onAfterSend: async (to, result) => console.log("Sent:", to, result),
    onDestroy: async () => console.log("Destroyed"),
  }),
);
```

See [Plugin](/docs/reference/stable/imessage-kit/symbols/plugin) for the full hook surface. Hooks take positional args — `onBeforeSend(to, content)`, `onAfterSend(to, result)` — not a single object. `definePlugin()` is a helper that just returns its argument for type inference.

## Error handling

```ts theme={null}
import {
  ConfigError,
  DatabaseError,
  IMessageError,
  PlatformError,
  SendError,
  WebhookError,
} from "@photon-ai/imessage-kit";

try {
  await sdk.send("+1234567890", "Hello");
} catch (error) {
  if (error instanceof IMessageError) {
    console.error(`[${error.code}] ${error.message}`);
  }
}
```

Every thrown error is an [IMessageError](/docs/reference/stable/imessage-kit/symbols/imessageerror). The factory functions (`PlatformError`, `DatabaseError`, `SendError`, `WebhookError`, `ConfigError`) produce `IMessageError` instances tagged with the corresponding `code` — switch on `error.code` rather than `instanceof` for each subtype.

## Links

* **Source**: [github.com/photon-hq/imessage-kit](https://github.com/photon-hq/imessage-kit)
* **LLM context**: [llms.txt](https://github.com/photon-hq/imessage-kit/blob/main/llms.txt), or `use context7: photon-hq/imessage-kit`
* **Discord**: [Join](https://discord.gg/bZd4CMd2H5)


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.