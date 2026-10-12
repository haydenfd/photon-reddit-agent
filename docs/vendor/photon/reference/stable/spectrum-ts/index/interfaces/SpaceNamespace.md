> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# SpaceNamespace

## Methods

### create()

```typescript
create(users: SpaceUserLike<Def> | SpaceUserLike<Def>[], params: SpaceParamsArgs<Def>): Promise<PlatformSpace<Def>>
```

Resolve or create a space from its participants — a single user (1:1
conversation) or several (group, where the platform supports it). Users
may be raw id strings or previously resolved `PlatformUser`s.

#### Parameters

<ResponseField name={"users"} type={"SpaceUserLike<Def> | SpaceUserLike<Def>[]"} required />

<ResponseField name={"params"} type={"SpaceParamsArgs<Def>"} required />

#### Returns

<code>{"Promise<"}[PlatformSpace](/docs/reference/stable/spectrum-ts/index/types/PlatformSpace){"<Def>>"}</code>

### get()

```typescript
get(id: string, params: SpaceParamsArgs<Def>): Promise<PlatformSpace<Def>>
```

Construct a space from a known platform space id — e.g. one persisted
from an earlier event. Providers may hydrate platform-specific fields
(or verify existence) via their `space.get` hook.

#### Parameters

<ResponseField name={"id"} type={"string"} required />

<ResponseField name={"params"} type={"SpaceParamsArgs<Def>"} required />

#### Returns

<code>{"Promise<"}[PlatformSpace](/docs/reference/stable/spectrum-ts/index/types/PlatformSpace){"<Def>>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.