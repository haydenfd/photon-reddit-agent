> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# SlashCommandEvent

> Event emitted when a user invokes a slash command.

Slash commands are triggered when a user types `/command` in the message composer.
The event provides access to the channel where the command was invoked, allowing
you to post responses using standard SDK methods.

```typescript
chat.onSlashCommand("/help", async (event) => {
  // Post visible to everyone in the channel
  await event.channel.post("Here are the available commands...");
});

chat.onSlashCommand("/secret", async (event) => {
  // Post ephemeral (only the invoking user sees it)
  await event.channel.postEphemeral(
    event.user,
    "This is just for you!",
    { fallbackToDM: false }
  );
});

chat.onSlashCommand("/feedback", async (event) => {
  // Open a modal
  await event.openModal({
    type: "modal",
    callbackId: "feedback_modal",
    title: "Submit Feedback",
    children: [{ type: "text_input", id: "feedback", label: "Your feedback" }],
  });
});
```

## Properties

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required>
  The adapter that received this event
</ResponseField>

<ResponseField name={"channel"} type={"Channel<TState>"} required>
  **Type:** <code>[Channel](/docs/reference/stable/chat/index/interfaces/Channel){"<TState>"}</code>

  The channel where the command was invoked
</ResponseField>

<ResponseField name={"command"} type={"string"} required>
  The slash command name (e.g., "/help")
</ResponseField>

<ResponseField name={"raw"} type={"unknown"} required>
  Platform-specific raw payload
</ResponseField>

<ResponseField name={"text"} type={"string"} required>
  Arguments text after the command (e.g., "topic search" from "/help topic search")
</ResponseField>

<ResponseField name={"triggerId"} type={"string"}>
  Trigger ID for opening modals (time-limited, typically \~3 seconds)
</ResponseField>

<ResponseField name={"user"} type={"Author"} typeHref={"/reference/stable/chat/index/interfaces/Author"} required>
  The user who invoked the command
</ResponseField>

## Methods

### openModal()

```typescript
openModal(modal: ChatElement): Promise<{ viewId: string } | undefined>
```

Open a modal/dialog form in response to this slash command.

#### Parameters

<ResponseField name={"modal"} type={"ChatElement"} typeHref={"/reference/stable/chat/index/types/ChatElement"} required>
  The modal element to display (JSX or ModalElement)
</ResponseField>

#### Returns

`Promise<{ viewId: string } | undefined>`

The view/dialog ID, or undefined if modals are not supported


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.