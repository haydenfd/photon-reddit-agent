> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChatToolsOptions

```typescript
interface ChatToolsOptions extends ChatToolsBaseOptions
```

## Properties

<ResponseField name={"chat"} type={"ChatBinding"} typeHref={"/reference/stable/chat/ai/types/ChatBinding"} required>
  The Chat instance the tools dispatch operations against.
</ResponseField>

<ResponseField name={"overrides"} type={"Partial<Record<ChatToolName, Partial<Pick<Tool, \"description\" | \"inputExamples\"…"}>
  **Type:** <code>{"Partial<Record<"}[ChatToolName](/docs/reference/stable/chat/ai/types/ChatToolName){", Partial<Pick<Tool, \"description\" | \"inputExamples\" | \"metadata\" | \"needsApproval\" | \"onInputAvailable\" | \"onInputDelta\" | \"onInputStart\" | \"providerOptions\" | \"strict\" | \"title\" | \"toModelOutput\">>>>"}</code>

  Per-tool overrides for customizing tool behavior (description, title,
  needsApproval, etc.) without changing the underlying implementation.
  Core tool fields cannot be overridden.

  ```ts
  createChatTools({
    chat,
    overrides: {
      deleteMessage: { needsApproval: false },
      postMessage: { description: 'Reply in the active support thread.' },
    },
  })
  ```
</ResponseField>

<ResponseField name={"preset"} type={"ChatToolPreset | ChatToolPreset[]"}>
  **Type:** <code>[ChatToolPreset](/docs/reference/stable/chat/ai/types/ChatToolPreset){" | "}[ChatToolPreset](/docs/reference/stable/chat/ai/types/ChatToolPreset){"[]"}</code>

  Restrict the returned tools to a predefined preset.
  Omit to get all tools (same as `'moderator'`).

  ```ts
  createChatTools({ chat, preset: 'reader' })
  createChatTools({ chat, preset: ['reader', 'messenger'] })
  ```
</ResponseField>

<ResponseField name={"requireApproval"} type={"ApprovalConfig"} typeHref={"/reference/stable/chat/ai/types/ApprovalConfig"}>
  Whether sensitive operations require user approval before executing.
  Defaults to `true` for all write tools and `getUser`.
</ResponseField>

<ResponseField name={"scope"} type={"false | ReadScope"}>
  **Type:** <code>{"false | "}[ReadScope](/docs/reference/stable/chat/ai/types/ReadScope)</code>

  Confine tools to a single conversation, so a thread or channel id the
  model supplies that resolves elsewhere is rejected. Applies to reads and
  writes that target a thread or channel; `getUser` and `sendDirectMessage`
  target user ids and are gated by approval instead.

  Scoping is channel-level: a call is allowed when it resolves to the same
  channel as the scoped conversation, so a thread scope still permits sibling
  threads within that channel. Set `ChatToolsBaseOptions.strictScope`
  to tighten a thread scope to that thread alone.

  Defaults to the conversation being handled, so tools created inside a
  handler are already confined to it. Set this when the agent runs outside
  a handler and still acts on a user's behalf, or pass a channel id to
  operate channel-wide.

  Pass `false` to reach every conversation the bot can see. When no
  scope resolves (outside a handler, no explicit scope), tools run
  workspace-wide and a warning is logged.

  ```ts
  bot.onNewMention(async (thread) => {
    const tools = createChatTools({ chat, preset: 'reader' })
  })
  ```
</ResponseField>

<ResponseField name={"strictScope"} type={"boolean"}>
  Tighten `scope` from channel-level (default) to conversation-level.

  By default a call is in scope when it resolves to the same channel as the
  scoped conversation, so a thread scope still permits sibling threads in
  that channel. Set `true` to confine a thread scope to that thread alone:
  sibling threads and the parent channel are both rejected, which matters
  on platforms where a channel is the widest surface available (a GitHub
  channel is an entire repo). A channel scope is unaffected; it still
  allows any thread within the channel.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.