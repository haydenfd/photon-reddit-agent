> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# toAiMessages

```typescript
toAiMessages(messages: Message<unknown>[], options?: ToAiMessagesOptions): Promise<AiMessage[]>
```

Convert chat SDK messages to AI SDK conversation format.

* Keeps messages that have no text but carry content (images, files, links).
  Only messages with no usable content at all are skipped.
* Maps `author.isMe === true` to `"assistant"`, otherwise `"user"`
* Uses `message.text` for content
* Appends bounded link metadata inside an explicit untrusted-content fence
* Includes image attachments and text files as `FilePart`
* Uses `fetchData()` when available to include attachment data inline
* Warns on unsupported attachment types (video, audio)

Works with `FetchResult.messages`, `thread.recentMessages`, or collected iterables.

```typescript
const result = await thread.adapter.fetchMessages(thread.id, { limit: 20 });
const history = await toAiMessages(result.messages);
const response = await agent.stream({ prompt: history });
```

## Parameters

<ResponseField name={"messages"} type={"Message<unknown>[]"} required>
  **Type:** <code>[Message](/docs/reference/stable/chat/index/classes/Message){"<unknown>[]"}</code>
</ResponseField>

<ResponseField name={"options"} type={"ToAiMessagesOptions"} typeHref={"/reference/stable/chat/ai/interfaces/ToAiMessagesOptions"} />

## Returns

<code>{"Promise<"}[AiMessage](/docs/reference/stable/chat/ai/types/AiMessage){"[]>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.