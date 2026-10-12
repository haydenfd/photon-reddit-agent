> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Chat

> Main Chat class with type-safe adapter inference and custom thread state.

```ts
// Define custom thread state type
interface MyThreadState {
  aiMode?: boolean;
  userName?: string;
}

const chat = new Chat<typeof adapters, MyThreadState>({
  userName: "mybot",
  adapters: {
    slack: createSlackAdapter({ ... }),
    teams: createTeamsAdapter({ ... }),
  },
  state: createMemoryState(),
});

// Type-safe thread state
chat.onNewMention(async (thread, message) => {
  await thread.setState({ aiMode: true });
  const state = await thread.state; // Type: MyThreadState | null
});
```

```typescript
class Chat implements ChatInstance
```

## Constructor

```typescript
Chat(config: ChatConfig<TAdapters>): Chat<TAdapters, TState>
```

### Parameters

<ResponseField name={"config"} type={"ChatConfig<TAdapters>"} required>
  **Type:** <code>[ChatConfig](/docs/reference/stable/chat/index/interfaces/ChatConfig){"<TAdapters>"}</code>
</ResponseField>

### Returns

<code>[Chat](/docs/reference/stable/chat/index/classes/Chat){"<TAdapters, TState>"}</code>

## Properties

<ResponseField name={"history"} type={"HistoryApi"} typeHref={"/reference/stable/chat/index/interfaces/HistoryApi"} required>
  Unified History API. Sub-APIs:

  * `history.user`    — cross-platform per-user transcript store (throws if not configured)
  * `history.thread`  — per-thread message listing
  * `history.channel` — channel-level messages and thread listings
</ResponseField>

<ResponseField name={"transcripts"} type={"TranscriptsApi"} typeHref={"/reference/stable/chat/index/interfaces/TranscriptsApi"} required>
  Cross-platform per-user transcript store. Deprecated alias for
  `ChatInstance.history`.user — throws on access when user history
  was not configured (`history.user` or legacy `transcripts` + `identity`).

  <Warning>Deprecated: Use `ChatInstance.history`.user instead.</Warning>
</ResponseField>

<ResponseField name={"webhooks"} type={"Webhooks<TAdapters>"} required>
  Type-safe webhook handlers keyed by adapter name.

  ```ts
  chat.webhooks.slack(request, { backgroundTask: waitUntil });
  ```
</ResponseField>

## Methods

### abortTurn()

```typescript
abortTurn(threadId: string): Promise<void>
```

Abort active work for a conversation, including work running in another
process that shares the configured state adapter.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<void>`

### channel()

```typescript
channel(channelId: string): Channel<TState>
```

Get a Channel by its channel ID.

The adapter is automatically inferred from the channel ID prefix.

```typescript
const channel = chat.channel("slack:C123ABC");

// Iterate messages newest first
for await (const msg of channel.messages) {
  console.log(msg.text);
}

// List threads
for await (const t of channel.threads()) {
  console.log(t.rootMessage.text, t.replyCount);
}

// Post to channel
await channel.post("Hello channel!");
```

#### Parameters

<ResponseField name={"channelId"} type={"string"} required>
  Channel ID (e.g., "slack:C123ABC", "gchat:spaces/ABC123")
</ResponseField>

#### Returns

<code>[Channel](/docs/reference/stable/chat/index/interfaces/Channel){"<TState>"}</code>

A Channel that can be used to list threads, post messages, iterate messages, etc.

### getAdapter()

```typescript
getAdapter(name: K): TAdapters[K]
```

Get an adapter by name with type safety.

#### Parameters

<ResponseField name={"name"} type={"K"} required />

#### Returns

`TAdapters[K]`

### getLogger()

```typescript
getLogger(prefix?: string): Logger
```

Get the configured logger, optionally with a child prefix

#### Parameters

<ResponseField name={"prefix"} type={"string"} />

#### Returns

<code>[Logger](/docs/reference/stable/chat/index/interfaces/Logger)</code>

### getSingleton()

```typescript
getSingleton(): Chat
```

Get the registered singleton Chat instance.
Throws if no singleton has been registered.

#### Returns

<code>[Chat](/docs/reference/stable/chat/index/classes/Chat)</code>

### getState()

```typescript
getState(): StateAdapter
```

#### Returns

<code>[StateAdapter](/docs/reference/stable/chat/index/interfaces/StateAdapter)</code>

### getUser()

```typescript
getUser(user: string | Author): Promise<UserInfo | null>
```

Look up user information by user ID.

The adapter is automatically inferred from the user ID format.
Returns user details including email (where available — requires
appropriate scopes on some platforms, e.g. `users:read.email` on Slack).

```typescript
const user = await chat.getUser("U123456");
console.log(user?.email); // "alice@company.com"
```

#### Parameters

<ResponseField name={"user"} type={"string | Author"} required>
  **Type:** <code>{"string | "}[Author](/docs/reference/stable/chat/index/interfaces/Author)</code>

  Platform-specific user ID string, or an Author object
</ResponseField>

#### Returns

<code>{"Promise<"}[UserInfo](/docs/reference/stable/chat/index/interfaces/UserInfo){" | null>"}</code>

User info, or null if user not found

### getUserName()

```typescript
getUserName(): string
```

#### Returns

`string`

### handleIncomingMessage()

```typescript
handleIncomingMessage(adapter: Adapter, threadId: string, message: Message): Promise<void>
```

Handle an incoming message from an adapter.
This is called by adapters when they receive a webhook.

The Chat class handles common concerns centrally:

* Deduplication: Same message may arrive multiple times (e.g., Slack sends
  both `message` and `app_mention` events, GChat sends direct webhook + Pub/Sub)
* Bot filtering: Messages from the bot itself are skipped
* Concurrency: Controlled by `concurrency` config (drop, queue, debounce, burst, concurrent)

#### Parameters

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required />

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"message"} type={"Message"} typeHref={"/reference/stable/chat/index/classes/Message"} required />

#### Returns

`Promise<void>`

### hasSingleton()

```typescript
hasSingleton(): boolean
```

Check if a singleton has been registered.

#### Returns

`boolean`

### initialize()

```typescript
initialize(): Promise<void>
```

Initialize the chat instance and all adapters.
This is called automatically when handling webhooks, but can be called
manually for non-webhook use cases (e.g., Gateway listeners).

#### Returns

`Promise<void>`

### onAction()

```typescript
onAction(handler: ActionHandler): void
```

Register a handler for action events (button clicks in cards).

```typescript
// Handle specific action
chat.onAction("approve", async (event) => {
  await event.thread.post("Approved!");
});

// Handle multiple actions
chat.onAction(["approve", "reject"], async (event) => {
  if (event.actionId === "approve") {
    await event.thread.post("Approved!");
  } else {
    await event.thread.post("Rejected!");
  }
});

// Handle all actions (catch-all)
chat.onAction(async (event) => {
  console.log(`Action: ${event.actionId}`);
});
```

#### Parameters

<ResponseField name={"handler"} type={"ActionHandler"} typeHref={"/reference/stable/chat/index/types/ActionHandler"} required>
  The handler (if action ID filter is provided)
</ResponseField>

```typescript
onAction(actionIds: string | string[], handler: ActionHandler): void
```

Register a handler for action events (button clicks in cards).

```typescript
// Handle specific action
chat.onAction("approve", async (event) => {
  await event.thread.post("Approved!");
});

// Handle multiple actions
chat.onAction(["approve", "reject"], async (event) => {
  if (event.actionId === "approve") {
    await event.thread.post("Approved!");
  } else {
    await event.thread.post("Rejected!");
  }
});

// Handle all actions (catch-all)
chat.onAction(async (event) => {
  console.log(`Action: ${event.actionId}`);
});
```

#### Parameters

<ResponseField name={"actionIds"} type={"string | string[]"} required />

<ResponseField name={"handler"} type={"ActionHandler"} typeHref={"/reference/stable/chat/index/types/ActionHandler"} required>
  The handler (if action ID filter is provided)
</ResponseField>

### onAgentSessionStopped()

```typescript
onAgentSessionStopped(handler: AgentSessionStoppedHandler): void
```

#### Parameters

<ResponseField name={"handler"} type={"AgentSessionStoppedHandler"} typeHref={"/reference/stable/chat/index/types/AgentSessionStoppedHandler"} required />

### onAgentSessionTitleChanged()

```typescript
onAgentSessionTitleChanged(handler: AgentSessionTitleChangedHandler): void
```

#### Parameters

<ResponseField name={"handler"} type={"AgentSessionTitleChangedHandler"} typeHref={"/reference/stable/chat/index/types/AgentSessionTitleChangedHandler"} required />

### onAppContextChanged()

```typescript
onAppContextChanged(handler: AppContextChangedHandler): void
```

#### Parameters

<ResponseField name={"handler"} type={"AppContextChangedHandler"} typeHref={"/reference/stable/chat/index/types/AppContextChangedHandler"} required />

### onAppHomeOpened()

```typescript
onAppHomeOpened(handler: AppHomeOpenedHandler): void
```

#### Parameters

<ResponseField name={"handler"} type={"AppHomeOpenedHandler"} typeHref={"/reference/stable/chat/index/types/AppHomeOpenedHandler"} required />

### onAssistantContextChanged()

```typescript
onAssistantContextChanged(handler: AssistantContextChangedHandler): void
```

#### Parameters

<ResponseField name={"handler"} type={"AssistantContextChangedHandler"} typeHref={"/reference/stable/chat/index/types/AssistantContextChangedHandler"} required />

### onAssistantThreadStarted()

```typescript
onAssistantThreadStarted(handler: AssistantThreadStartedHandler): void
```

#### Parameters

<ResponseField name={"handler"} type={"AssistantThreadStartedHandler"} typeHref={"/reference/stable/chat/index/types/AssistantThreadStartedHandler"} required />

### onDirectMessage()

```typescript
onDirectMessage(handler: DirectMessageHandler<TState>): void
```

Register a handler for direct messages.

Called for every message received in a DM thread when at least one
direct message handler is registered. Direct message handlers run before
`onSubscribedMessage`, `onNewMention`, and pattern handlers.

If no `onDirectMessage` handlers are registered, DMs continue through
normal routing. Unsubscribed DMs fall through to `onNewMention` for
backward compatibility.

```typescript
chat.onDirectMessage(async (thread, message) => {
  await thread.subscribe();
  await thread.post("Thanks for the DM!");
});
```

#### Parameters

<ResponseField name={"handler"} type={"DirectMessageHandler<TState>"} required>
  **Type:** <code>[DirectMessageHandler](/docs/reference/stable/chat/index/types/DirectMessageHandler){"<TState>"}</code>

  Handler called for DM messages
</ResponseField>

### onInstalled()

```typescript
onInstalled(handler: InstalledHandler): void
```

Handle bot installation, including upgrades that add the bot (currently Teams only).

#### Parameters

<ResponseField name={"handler"} type={"InstalledHandler"} typeHref={"/reference/stable/chat/index/types/InstalledHandler"} required />

### onMemberJoinedChannel()

```typescript
onMemberJoinedChannel(handler: MemberJoinedChannelHandler): void
```

#### Parameters

<ResponseField name={"handler"} type={"MemberJoinedChannelHandler"} typeHref={"/reference/stable/chat/index/types/MemberJoinedChannelHandler"} required />

### onMessageDeleted()

```typescript
onMessageDeleted(handler: MessageDeletedHandler): void
```

Register a handler for message delete events.

Delete events usually do not include the deleted message body. Handlers get
the normalized platform IDs needed to update external storage.

#### Parameters

<ResponseField name={"handler"} type={"MessageDeletedHandler"} typeHref={"/reference/stable/chat/index/types/MessageDeletedHandler"} required />

### onMessageUpdated()

```typescript
onMessageUpdated(handler: MessageUpdatedHandler<TState>): void
```

Register a handler for message edit/update events.

These lifecycle events are dispatched directly by adapters and do not
route through `onNewMessage`, `onNewMention`, or `onSubscribedMessage`.

#### Parameters

<ResponseField name={"handler"} type={"MessageUpdatedHandler<TState>"} required>
  **Type:** <code>[MessageUpdatedHandler](/docs/reference/stable/chat/index/types/MessageUpdatedHandler){"<TState>"}</code>
</ResponseField>

### onModalClose()

```typescript
onModalClose(handler: ModalCloseHandler): void
```

Register a handler for modal close/cancel events.
Only fires when the modal was created with `notifyOnClose: true`.

```typescript
// Handle specific modal close
chat.onModalClose("settings-modal", async (event) => {
  console.log("User cancelled settings");
});

// Handle all modal close events
chat.onModalClose(async (event) => {
  console.log(`Modal ${event.callbackId} closed`);
});
```

#### Parameters

<ResponseField name={"handler"} type={"ModalCloseHandler"} typeHref={"/reference/stable/chat/index/types/ModalCloseHandler"} required>
  The handler (if callback ID filter is provided)
</ResponseField>

```typescript
onModalClose(callbackIds: string | string[], handler: ModalCloseHandler): void
```

Register a handler for modal close/cancel events.
Only fires when the modal was created with `notifyOnClose: true`.

```typescript
// Handle specific modal close
chat.onModalClose("settings-modal", async (event) => {
  console.log("User cancelled settings");
});

// Handle all modal close events
chat.onModalClose(async (event) => {
  console.log(`Modal ${event.callbackId} closed`);
});
```

#### Parameters

<ResponseField name={"callbackIds"} type={"string | string[]"} required />

<ResponseField name={"handler"} type={"ModalCloseHandler"} typeHref={"/reference/stable/chat/index/types/ModalCloseHandler"} required>
  The handler (if callback ID filter is provided)
</ResponseField>

### onModalSubmit()

```typescript
onModalSubmit(handler: ModalSubmitHandler): void
```

Register a handler for modal form submissions.

```typescript
// Handle specific modal
chat.onModalSubmit("settings-modal", async (event) => {
  const name = event.values["name"];
  await event.relatedThread?.post(`Updated name to ${name}`);
});

// Handle all modal submissions
chat.onModalSubmit(async (event) => {
  console.log(`Modal ${event.callbackId} submitted`);
});
```

#### Parameters

<ResponseField name={"handler"} type={"ModalSubmitHandler"} typeHref={"/reference/stable/chat/index/types/ModalSubmitHandler"} required>
  The handler (if callback ID filter is provided)
</ResponseField>

```typescript
onModalSubmit(callbackIds: string | string[], handler: ModalSubmitHandler): void
```

Register a handler for modal form submissions.

```typescript
// Handle specific modal
chat.onModalSubmit("settings-modal", async (event) => {
  const name = event.values["name"];
  await event.relatedThread?.post(`Updated name to ${name}`);
});

// Handle all modal submissions
chat.onModalSubmit(async (event) => {
  console.log(`Modal ${event.callbackId} submitted`);
});
```

#### Parameters

<ResponseField name={"callbackIds"} type={"string | string[]"} required />

<ResponseField name={"handler"} type={"ModalSubmitHandler"} typeHref={"/reference/stable/chat/index/types/ModalSubmitHandler"} required>
  The handler (if callback ID filter is provided)
</ResponseField>

### onNewMention()

```typescript
onNewMention(handler: MentionHandler<TState>): void
```

Register a handler for new @-mentions of the bot.

**Important**: This handler is ONLY called for mentions in **unsubscribed** threads.
Once a thread is subscribed (via `thread.subscribe()`), subsequent messages
including @-mentions go to `onSubscribedMessage` handlers instead.

To detect mentions in subscribed threads, check `message.isMention`:

```typescript
// Handle new mentions (unsubscribed threads only)
chat.onNewMention(async (thread, message) => {
  await thread.subscribe();  // Subscribe to follow-up messages
  await thread.post("Hello! I'll be watching this thread.");
});

// Handle all messages in subscribed threads
chat.onSubscribedMessage(async (thread, message) => {
  if (message.isMention) {
    // User @-mentioned us in a thread we're already watching
    await thread.post("You mentioned me again!");
  }
});
```

#### Parameters

<ResponseField name={"handler"} type={"MentionHandler<TState>"} required>
  **Type:** <code>[MentionHandler](/docs/reference/stable/chat/index/types/MentionHandler){"<TState>"}</code>
</ResponseField>

### onNewMessage()

```typescript
onNewMessage(pattern: RegExp, handler: MessageHandler<TState>): void
```

Register a handler for messages matching a regex pattern.

```typescript
// Match messages starting with "!help"
chat.onNewMessage(/^!help/, async (thread, message) => {
  await thread.post("Available commands: !help, !status, !ping");
});
```

#### Parameters

<ResponseField name={"pattern"} type={"RegExp"} required>
  Regular expression to match against message text
</ResponseField>

<ResponseField name={"handler"} type={"MessageHandler<TState>"} required>
  **Type:** <code>[MessageHandler](/docs/reference/stable/chat/index/types/MessageHandler){"<TState>"}</code>

  Handler called when pattern matches
</ResponseField>

### onOptionsLoad()

```typescript
onOptionsLoad(handler: OptionsLoadHandler): void
```

Register a handler for loading dynamic options for external selects.
Specific action IDs run before catch-all handlers.

#### Parameters

<ResponseField name={"handler"} type={"OptionsLoadHandler"} typeHref={"/reference/stable/chat/index/types/OptionsLoadHandler"} required />

```typescript
onOptionsLoad(actionIds: string | string[], handler: OptionsLoadHandler): void
```

Register a handler for loading dynamic options for external selects.
Specific action IDs run before catch-all handlers.

#### Parameters

<ResponseField name={"actionIds"} type={"string | string[]"} required />

<ResponseField name={"handler"} type={"OptionsLoadHandler"} typeHref={"/reference/stable/chat/index/types/OptionsLoadHandler"} required />

### onReaction()

```typescript
onReaction(handler: ReactionHandler): void
```

Register a handler for reaction events.

```typescript
// Handle specific emoji using EmojiValue objects (recommended)
chat.onReaction([emoji.thumbs_up, emoji.heart], async (event) => {
  if (event.emoji === emoji.thumbs_up) {
    console.log("Thumbs up!");
  }
});

// Handle all reactions
chat.onReaction(async (event) => {
  console.log(`${event.added ? "Added" : "Removed"} ${event.emoji.name}`);
});
```

#### Parameters

<ResponseField name={"handler"} type={"ReactionHandler"} typeHref={"/reference/stable/chat/index/types/ReactionHandler"} required>
  The handler (if emoji filter is provided)
</ResponseField>

```typescript
onReaction(emoji: EmojiFilter[], handler: ReactionHandler): void
```

Register a handler for reaction events.

```typescript
// Handle specific emoji using EmojiValue objects (recommended)
chat.onReaction([emoji.thumbs_up, emoji.heart], async (event) => {
  if (event.emoji === emoji.thumbs_up) {
    console.log("Thumbs up!");
  }
});

// Handle all reactions
chat.onReaction(async (event) => {
  console.log(`${event.added ? "Added" : "Removed"} ${event.emoji.name}`);
});
```

#### Parameters

<ResponseField name={"emoji"} type={"EmojiFilter[]"} required />

<ResponseField name={"handler"} type={"ReactionHandler"} typeHref={"/reference/stable/chat/index/types/ReactionHandler"} required>
  The handler (if emoji filter is provided)
</ResponseField>

### onSlashCommand()

```typescript
onSlashCommand(handler: SlashCommandHandler<TState>): void
```

Register a handler for slash command events.

Slash commands are triggered when a user types `/command` in the message composer.
Use `event.channel.post()` or `event.channel.postEphemeral()` to respond.

```typescript
// Handle a specific command
chat.onSlashCommand("/help", async (event) => {
  await event.channel.post("Here are the available commands...");
});

// Handle multiple commands
chat.onSlashCommand(["/status", "/health"], async (event) => {
  await event.channel.post("All systems operational!");
});

// Handle all commands (catch-all)
chat.onSlashCommand(async (event) => {
  console.log(`Received command: ${event.command} ${event.text}`);
});

// Open a modal from a slash command
chat.onSlashCommand("/feedback", async (event) => {
  await event.openModal({
    callbackId: "feedback_modal",
    title: "Submit Feedback",
    inputs: [{ id: "feedback", type: "text_input", label: "Your feedback" }],
  });
});
```

#### Parameters

<ResponseField name={"handler"} type={"SlashCommandHandler<TState>"} required>
  **Type:** <code>[SlashCommandHandler](/docs/reference/stable/chat/index/types/SlashCommandHandler){"<TState>"}</code>

  The handler (if command filter is provided)
</ResponseField>

```typescript
onSlashCommand(commands: string | string[], handler: SlashCommandHandler<TState>): void
```

Register a handler for slash command events.

Slash commands are triggered when a user types `/command` in the message composer.
Use `event.channel.post()` or `event.channel.postEphemeral()` to respond.

```typescript
// Handle a specific command
chat.onSlashCommand("/help", async (event) => {
  await event.channel.post("Here are the available commands...");
});

// Handle multiple commands
chat.onSlashCommand(["/status", "/health"], async (event) => {
  await event.channel.post("All systems operational!");
});

// Handle all commands (catch-all)
chat.onSlashCommand(async (event) => {
  console.log(`Received command: ${event.command} ${event.text}`);
});

// Open a modal from a slash command
chat.onSlashCommand("/feedback", async (event) => {
  await event.openModal({
    callbackId: "feedback_modal",
    title: "Submit Feedback",
    inputs: [{ id: "feedback", type: "text_input", label: "Your feedback" }],
  });
});
```

#### Parameters

<ResponseField name={"commands"} type={"string | string[]"} required />

<ResponseField name={"handler"} type={"SlashCommandHandler<TState>"} required>
  **Type:** <code>[SlashCommandHandler](/docs/reference/stable/chat/index/types/SlashCommandHandler){"<TState>"}</code>

  The handler (if command filter is provided)
</ResponseField>

### onSubscribedMessage()

```typescript
onSubscribedMessage(handler: SubscribedMessageHandler<TState>): void
```

Register a handler for messages in subscribed threads.

Called for all messages in threads that have been subscribed via `thread.subscribe()`.
This includes:

* Follow-up messages from users
* Messages that @-mention the bot (check `message.isMention`)

Does NOT fire for:

* The message that triggered the subscription (e.g., the initial @mention)
* Messages sent by the bot itself

```typescript
chat.onSubscribedMessage(async (thread, message) => {
  // Handle all follow-up messages
  if (message.isMention) {
    // User @-mentioned us in a subscribed thread
  }
  await thread.post(`Got your message: ${message.text}`);
});
```

#### Parameters

<ResponseField name={"handler"} type={"SubscribedMessageHandler<TState>"} required>
  **Type:** <code>[SubscribedMessageHandler](/docs/reference/stable/chat/index/types/SubscribedMessageHandler){"<TState>"}</code>
</ResponseField>

### onUninstalled()

```typescript
onUninstalled(handler: UninstalledHandler): void
```

Handle bot removal, including upgrades that remove the bot (currently Teams only).

#### Parameters

<ResponseField name={"handler"} type={"UninstalledHandler"} typeHref={"/reference/stable/chat/index/types/UninstalledHandler"} required />

### openDM()

```typescript
openDM(user: string | Author): Promise<Thread<TState, unknown>>
```

Open a direct message conversation with a user.

Accepts either a user ID string or an Author object (from message.author or event.user).

The adapter is automatically inferred from the userId format:

* Slack: `U...` (e.g., "U00FAKEUSER1")
* Teams: `29:...` (e.g., "29:198PbJuw\...")
* Google Chat: `users/...` (e.g., "users/100000000000000000001")
* Discord: numeric snowflake (e.g., "1033044521375764530")

```ts
// Using user ID directly
const dmThread = await chat.openDM("U123456");
await dmThread.post("Hello via DM!");

// Using Author object from a message
chat.onSubscribedMessage(async (thread, message) => {
  const dmThread = await chat.openDM(message.author);
  await dmThread.post("Hello via DM!");
});
```

#### Parameters

<ResponseField name={"user"} type={"string | Author"} required>
  **Type:** <code>{"string | "}[Author](/docs/reference/stable/chat/index/interfaces/Author)</code>

  Platform-specific user ID string, or an Author object
</ResponseField>

#### Returns

<code>{"Promise<"}[Thread](/docs/reference/stable/chat/index/interfaces/Thread){"<TState, unknown>>"}</code>

A Thread that can be used to post messages

### processAction()

```typescript
processAction(event: Omit<ActionEvent<unknown>, "thread" | "openModal"> & { adapter: Adapter }, options: WebhookOptions | undefined): Promise<void>
```

Process an incoming action event (button click) from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<ActionEvent<unknown>, \"thread\" | \"openModal\"> & { adapter: Adapter }"} required>
  **Type:** <code>{"Omit<"}[ActionEvent](/docs/reference/stable/chat/index/interfaces/ActionEvent){"<unknown>, \"thread\" | \"openModal\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){" }"}</code>
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions | undefined"} required>
  **Type:** <code>[WebhookOptions](/docs/reference/stable/chat/index/interfaces/WebhookOptions){" | undefined"}</code>
</ResponseField>

#### Returns

`Promise<void>`

### processAgentSessionStopped()

```typescript
processAgentSessionStopped(event: AgentSessionStoppedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AgentSessionStoppedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AgentSessionStoppedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAgentSessionTitleChanged()

```typescript
processAgentSessionTitleChanged(event: AgentSessionTitleChangedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AgentSessionTitleChangedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AgentSessionTitleChangedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAppContextChanged()

```typescript
processAppContextChanged(event: AppContextChangedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AppContextChangedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AppContextChangedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAppHomeOpened()

```typescript
processAppHomeOpened(event: AppHomeOpenedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AppHomeOpenedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AppHomeOpenedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAssistantContextChanged()

```typescript
processAssistantContextChanged(event: AssistantContextChangedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AssistantContextChangedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AssistantContextChangedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processAssistantThreadStarted()

```typescript
processAssistantThreadStarted(event: AssistantThreadStartedEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"AssistantThreadStartedEvent"} typeHref={"/reference/stable/chat/index/interfaces/AssistantThreadStartedEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processInstalled()

```typescript
processInstalled(event: InstalledEvent, options?: WebhookOptions): void
```

Optional so custom ChatInstance implementations predating it keep compiling.

#### Parameters

<ResponseField name={"event"} type={"InstalledEvent"} typeHref={"/reference/stable/chat/index/interfaces/InstalledEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processMemberJoinedChannel()

```typescript
processMemberJoinedChannel(event: MemberJoinedChannelEvent, options?: WebhookOptions): void
```

#### Parameters

<ResponseField name={"event"} type={"MemberJoinedChannelEvent"} typeHref={"/reference/stable/chat/index/interfaces/MemberJoinedChannelEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### processMessage()

```typescript
processMessage(adapter: Adapter, threadId: string, messageOrFactory: Message<unknown> | () => Promise<Message<unknown>>, options?: WebhookOptions): Promise<void>
```

Process an incoming message from an adapter.
Handles waitUntil registration and error catching internally.
Adapters should call this instead of handleIncomingMessage directly.

#### Parameters

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required />

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"messageOrFactory"} type={"Message<unknown> | () => Promise<Message<unknown>>"} required>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown> | () => Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>"}</code>
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

#### Returns

`Promise<void>`

### processMessageDeleted()

```typescript
processMessageDeleted(event: Omit<MessageDeletedEvent<unknown>, "platform" | "adapter"> & { adapter: Adapter; platform: string }, options?: WebhookOptions): Promise<void>
```

Process an incoming message delete from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<MessageDeletedEvent<unknown>, \"platform\" | \"adapter\"> & { adapter: Adapter…"} required>
  **Type:** <code>{"Omit<"}[MessageDeletedEvent](/docs/reference/stable/chat/index/interfaces/MessageDeletedEvent){"<unknown>, \"platform\" | \"adapter\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"; platform: string }"}</code>
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

#### Returns

`Promise<void>`

### processMessageUpdated()

```typescript
processMessageUpdated(event: { adapter: Adapter; message: Message<unknown> | () => Promise<Message<unknown>>; previousMessage: Message<unknown> | () => Promise<Message<unknown>>; threadId: string }, options?: WebhookOptions): Promise<void>
```

Process an incoming message update from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"{ adapter: Adapter; message: Message<unknown> | () => Promise<Message<unknown>>…"} required>
  **Type:** <code>{"{ adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"; message: "}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown> | () => Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>; previousMessage: "}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown> | () => Promise<"}[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>>; threadId: string }"}</code>
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

#### Returns

`Promise<void>`

### processModalClose()

```typescript
processModalClose(event: Omit<ModalCloseEvent, "relatedThread" | "relatedMessage" | "relatedChannel">, contextId?: string, options?: WebhookOptions): void
```

Process a modal close event from an adapter.

#### Parameters

<ResponseField name={"event"} type={"Omit<ModalCloseEvent, \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"} required>
  **Type:** <code>{"Omit<"}[ModalCloseEvent](/docs/reference/stable/chat/index/interfaces/ModalCloseEvent){", \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"}</code>

  The modal close event (without relatedThread/relatedMessage/relatedChannel)
</ResponseField>

<ResponseField name={"contextId"} type={"string"}>
  Context ID for retrieving stored thread/message/channel context
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options
</ResponseField>

### processModalSubmit()

```typescript
processModalSubmit(event: Omit<ModalSubmitEvent, "relatedThread" | "relatedMessage" | "relatedChannel">, contextId?: string, options?: WebhookOptions): Promise<ModalResponse | undefined>
```

Process a modal submit event from an adapter.

#### Parameters

<ResponseField name={"event"} type={"Omit<ModalSubmitEvent, \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"} required>
  **Type:** <code>{"Omit<"}[ModalSubmitEvent](/docs/reference/stable/chat/index/interfaces/ModalSubmitEvent){", \"relatedThread\" | \"relatedMessage\" | \"relatedChannel\">"}</code>

  The modal submit event (without relatedThread/relatedMessage/relatedChannel)
</ResponseField>

<ResponseField name={"contextId"} type={"string"}>
  Context ID for retrieving stored thread/message/channel context
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"}>
  Webhook options
</ResponseField>

#### Returns

<code>{"Promise<"}[ModalResponse](/docs/reference/stable/chat/index/types/ModalResponse){" | undefined>"}</code>

### processOptionsLoad()

```typescript
processOptionsLoad(event: OptionsLoadEvent, _options?: WebhookOptions): Promise<OptionsLoadResult | undefined>
```

Process an interactive options load event from an adapter.
Returns normalized select options for the adapter to render.

#### Parameters

<ResponseField name={"event"} type={"OptionsLoadEvent"} typeHref={"/reference/stable/chat/index/interfaces/OptionsLoadEvent"} required />

<ResponseField name={"_options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

#### Returns

<code>{"Promise<"}[OptionsLoadResult](/docs/reference/stable/chat/index/types/OptionsLoadResult){" | undefined>"}</code>

### processReaction()

```typescript
processReaction(event: Omit<ReactionEvent<unknown>, "thread" | "adapter"> & { adapter: Adapter<unknown, unknown> }, options?: WebhookOptions): Promise<void>
```

Process an incoming reaction event from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<ReactionEvent<unknown>, \"thread\" | \"adapter\"> & { adapter: Adapter<unknown…"} required>
  **Type:** <code>{"Omit<"}[ReactionEvent](/docs/reference/stable/chat/index/interfaces/ReactionEvent){"<unknown>, \"thread\" | \"adapter\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"<unknown, unknown> }"}</code>
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

#### Returns

`Promise<void>`

### processSlashCommand()

```typescript
processSlashCommand(event: Omit<SlashCommandEvent<Record<string, unknown>>, "channel" | "openModal"> & { adapter: Adapter; channelId: string }, options: WebhookOptions | undefined): Promise<void>
```

Process an incoming slash command from an adapter.
Handles waitUntil registration and error catching internally.

#### Parameters

<ResponseField name={"event"} type={"Omit<SlashCommandEvent<Record<string, unknown>>, \"channel\" | \"openModal\"> & { a…"} required>
  **Type:** <code>{"Omit<"}[SlashCommandEvent](/docs/reference/stable/chat/index/interfaces/SlashCommandEvent){"<Record<string, unknown>>, \"channel\" | \"openModal\"> & { adapter: "}[Adapter](/docs/reference/stable/chat/index/interfaces/Adapter){"; channelId: string }"}</code>
</ResponseField>

<ResponseField name={"options"} type={"WebhookOptions | undefined"} required>
  **Type:** <code>[WebhookOptions](/docs/reference/stable/chat/index/interfaces/WebhookOptions){" | undefined"}</code>
</ResponseField>

#### Returns

`Promise<void>`

### processUninstalled()

```typescript
processUninstalled(event: UninstalledEvent, options?: WebhookOptions): void
```

Optional so custom ChatInstance implementations predating it keep compiling.

#### Parameters

<ResponseField name={"event"} type={"UninstalledEvent"} typeHref={"/reference/stable/chat/index/interfaces/UninstalledEvent"} required />

<ResponseField name={"options"} type={"WebhookOptions"} typeHref={"/reference/stable/chat/index/interfaces/WebhookOptions"} />

### registerSingleton()

```typescript
registerSingleton(): this
```

Register this Chat instance as the global singleton.
Required for Thread deserialization via @workflow/serde.

```typescript
const chat = new Chat({ ... });
chat.registerSingleton();

// Now threads can be deserialized without passing chat explicitly
const thread = ThreadImpl.fromJSON(serializedThread);
```

#### Returns

`this`

### reviver()

```typescript
reviver(): (key: string, value: unknown) => unknown
```

Get a JSON.parse reviver function that automatically deserializes
chat:Thread and chat:Message objects.

Use this when parsing JSON that contains serialized Thread or Message objects
(e.g., from workflow engine payloads).

```typescript
// Parse workflow payload with automatic deserialization
const data = JSON.parse(payload, chat.reviver());

// data.thread is now a ThreadImpl instance
// data.message is now a Message object with Date fields restored
await data.thread.post("Hello from workflow!");
```

#### Returns

`(key: string, value: unknown) => unknown`

A reviver function for JSON.parse

### shutdown()

```typescript
shutdown(): Promise<void>
```

Gracefully shut down the chat instance.

#### Returns

`Promise<void>`

### thread()

```typescript
thread(threadId: string): Thread<TState>
```

Get a Thread handle by its thread ID.

The adapter is automatically inferred from the thread ID prefix.

```typescript
const thread = chat.thread("slack:C123ABC:1234567890.123456");
await thread.post("Hello from outside a webhook!");
```

#### Parameters

<ResponseField name={"threadId"} type={"string"} required>
  Full thread ID (e.g., "slack:C123ABC:1234567890.123456")
</ResponseField>

#### Returns

<code>[Thread](/docs/reference/stable/chat/index/interfaces/Thread){"<TState>"}</code>

A Thread that can be used to post messages, subscribe, etc.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.