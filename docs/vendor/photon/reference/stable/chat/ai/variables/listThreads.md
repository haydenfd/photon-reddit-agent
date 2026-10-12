> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# listThreads

```typescript
const listThreads: (chat: ChatBinding, guard: ScopeGuard) => Tool<{ channelId: string; cursor: string; limit: number }, { nextCursor: string | undefined; threads: { id: string; lastReplyAt: string | undefined; replyCount: number | undefined; rootMessage: { attachments: { mimeType: string | undefined; name: string | undefined; type: "image" | "file" | "video" | "audio"; url: string | undefined }[]; author: { fullName: string; isBot: boolean | "unknown"; isMe: boolean; userId: string; userName: string }; dateSent: string; edited: boolean; id: string; isMention: boolean | undefined; text: string; threadId: string } }[] }>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.