> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ReactionEvent

> Reaction event fired when a user adds or removes a reaction.

## Properties

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required>
  The adapter that received the event
</ResponseField>

<ResponseField name={"added"} type={"boolean"} required>
  Whether the reaction was added (true) or removed (false)
</ResponseField>

<ResponseField name={"emoji"} type={"EmojiValue"} typeHref={"/reference/stable/chat/index/interfaces/EmojiValue"} required>
  The normalized emoji as an EmojiValue singleton (enables `===` comparison)
</ResponseField>

<ResponseField name={"message"} type={"Message<TRawMessage>"}>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<TRawMessage>"}</code>

  The message that was reacted to (if available)
</ResponseField>

<ResponseField name={"messageId"} type={"string"} required>
  The message ID that was reacted to
</ResponseField>

<ResponseField name={"raw"} type={"unknown"} required>
  Platform-specific raw event data
</ResponseField>

<ResponseField name={"rawEmoji"} type={"string"} required>
  The raw platform-specific emoji (e.g., "+1" for Slack, "👍" for GChat)
</ResponseField>

<ResponseField name={"thread"} type={"Thread<TRawMessage>"} required>
  **Type:** <code>[Thread](/docs/reference/stable/chat/index/interfaces/Thread){"<TRawMessage>"}</code>

  The thread where the reaction occurred.
  Use this to post replies or check subscription status.

  ```typescript
  chat.onReaction([emoji.thumbs_up], async (event) => {
    await event.thread.post(`Thanks for the ${event.emoji}!`);
  });
  ```
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required>
  The thread ID
</ResponseField>

<ResponseField name={"user"} type={"Author"} typeHref={"/reference/stable/chat/index/interfaces/Author"} required>
  The user who added/removed the reaction
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.