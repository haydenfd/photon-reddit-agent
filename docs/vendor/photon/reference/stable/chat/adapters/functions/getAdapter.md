> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# getAdapter

```typescript
getAdapter(slug: "agentphone" | "cloudflare-agents" | "dial" | "discord" | "github" | "gmail" | "gchat" | "ioredis" | "instagram" | "kapso" | "lark" | "linear" | "linq" | "liveblocks" | "matrix" | "memory" | "messenger" | "notion" | "novu" | "photon" | "postgres" | "redis" | "resend" | "sendblue" | "slack" | "teams" | "telegram" | "twilio" | "velt" | "web" | "whatsapp" | "x" | "xchat" | "zernio"): CatalogAdapter
```

Look up a catalog entry by slug.

## Parameters

<ResponseField name={"slug"} type={"\"agentphone\" | \"cloudflare-agents\" | \"dial\" | \"discord\" | \"github\" | \"gmail\" | …"} required>
  Adapter slug to look up.
</ResponseField>

## Returns

<code>[CatalogAdapter](/docs/reference/stable/chat/adapters/interfaces/CatalogAdapter)</code>

The catalog entry for known slugs, otherwise `undefined`.

```typescript
getAdapter(slug: string): CatalogAdapter | undefined
```

Look up a catalog entry by slug.

## Parameters

<ResponseField name={"slug"} type={"string"} required>
  Adapter slug to look up.
</ResponseField>

## Returns

<code>[CatalogAdapter](/docs/reference/stable/chat/adapters/interfaces/CatalogAdapter){" | undefined"}</code>

The catalog entry for known slugs, otherwise `undefined`.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.