> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# requestApproval

```typescript
requestApproval(thread: Thread, options: RequestApprovalOptions): Promise<ApprovalResult>
```

Post an approval card to a thread and suspend the workflow until a user
approves or denies, or the timeout elapses. Must run inside a
`"use workflow"` function.

By default any authenticated user who clicks decides; pass `approvers` to
restrict who may approve (recommended for consequential actions).

## Parameters

<ResponseField name={"thread"} type={"Thread"} typeHref={"/reference/stable/chat/index/interfaces/Thread"} required />

<ResponseField name={"options"} type={"RequestApprovalOptions"} typeHref={"/reference/stable/chat/workflow/interfaces/RequestApprovalOptions"} required />

## Returns

<code>{"Promise<"}[ApprovalResult](/docs/reference/stable/chat/workflow/interfaces/ApprovalResult){">"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.