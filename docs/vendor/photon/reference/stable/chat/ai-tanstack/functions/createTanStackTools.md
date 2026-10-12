> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# createTanStackTools

```typescript
createTanStackTools(__namedParameters: TanStackChatToolsOptions): TanStackTool<unknown, unknown>[]
```

Create a set of Chat SDK tools for TanStack AI.

Returns plain tool objects accepted by `chat({ tools })` from
`@tanstack/ai`, with the same tools, presets, approval flags, scope guard,
and override rules as `createChatTools` from `chat/ai`.

Requires zod 4.2 or newer for the input schemas. `needsApproval: true`
makes TanStack pause the run with a tool-approval interrupt; a server-side
bot has to resume that run itself (see the TanStack AI docs on tool
approval), so most bots pass `requireApproval: false` or handle approval
before calling `chat()`.

```ts
import { chat } from '@tanstack/ai'
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway'
import { createTanStackTools, toTanStackMessages } from 'chat/ai/tanstack'

bot.onNewMention(async (thread, message) => {
  const history = await thread.adapter.fetchMessages(thread.id, { limit: 20 })
  const stream = chat({
    adapter: vercelGatewayText('anthropic/claude-opus-5'),
    systemPrompts: ['You are a helpful assistant.'],
    messages: await toTanStackMessages(history.messages),
    tools: createTanStackTools({ chat: bot, preset: 'messenger', requireApproval: false }),
  })
  await thread.post(stream)
})
```

## Parameters

<ResponseField name={"__namedParameters"} type={"TanStackChatToolsOptions"} typeHref={"/reference/stable/chat/ai-tanstack/interfaces/TanStackChatToolsOptions"} required />

## Returns

<code>[TanStackTool](/docs/reference/stable/chat/ai-tanstack/interfaces/TanStackTool){"<unknown, unknown>[]"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.