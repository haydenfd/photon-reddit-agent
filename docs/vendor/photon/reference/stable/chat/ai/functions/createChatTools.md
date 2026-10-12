> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# createChatTools

```typescript
createChatTools(__namedParameters: ChatToolsOptions): Partial<ChatToolMap>
```

Create a set of Chat SDK tools for the Vercel AI SDK.

Lets an AI agent operate inside a workspace: read messages, post replies,
send DMs, react, edit, delete, and manage thread subscriptions across
every adapter the supplied [ChatBinding](/docs/reference/stable/chat/ai/types/ChatBinding) has registered.

Write operations and arbitrary user profile lookups require approval by
default. Control this globally or per-tool via `requireApproval`. Use
`preset` to scope the toolset.

Using TanStack AI instead? Import `createTanStackTools` from
`chat/ai/tanstack`; it exposes the same tools, options, and presets.

```ts
import { Chat } from 'chat'
import { createChatTools } from 'chat/ai'
import { generateText } from 'ai'

const chat = new Chat({ ... })

const result = await generateText({
  model: yourModel,
  tools: createChatTools({ chat, preset: 'messenger' }),
  prompt: 'Reply in thread slack:C123:1234.5678 with the daily summary.',
})
```

## Parameters

<ResponseField name={"__namedParameters"} type={"ChatToolsOptions"} typeHref={"/reference/stable/chat/ai/interfaces/ChatToolsOptions"} required />

## Returns

`Partial<ChatToolMap>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.