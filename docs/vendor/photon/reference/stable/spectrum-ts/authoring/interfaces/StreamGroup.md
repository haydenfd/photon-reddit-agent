> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# StreamGroup

```typescript
interface StreamGroup extends ManagedStream<T>
```

## Methods

### [asyncIterator]()

```typescript
[asyncIterator](): AsyncIterator<T, any, any>
```

#### Returns

`AsyncIterator<T, any, any>`

### add()

```typescript
add(key: string, source: StreamGroupSource<T>): boolean
```

Attach `key`. Returns false — without invoking `source`, which typically
opens a subscription — when the key is already attached or the group is
closed. Safe before the group has a consumer: the factory runs when the
group first starts.

#### Parameters

<ResponseField name={"key"} type={"string"} required />

<ResponseField name={"source"} type={"StreamGroupSource<T>"} required>
  **Type:** <code>[StreamGroupSource](/docs/reference/stable/spectrum-ts/authoring/types/StreamGroupSource){"<T>"}</code>
</ResponseField>

#### Returns

`boolean`

### close()

```typescript
close(): Promise<void>
```

#### Returns

`Promise<void>`

### has()

```typescript
has(key: string): boolean
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`boolean`

### keys()

```typescript
keys(): string[]
```

Attached keys, in attach order.

#### Returns

`string[]`

### remove()

```typescript
remove(key: string): Promise<boolean>
```

Detach `key` and close its source. Resolves once that source's own
`close()` settles; it deliberately does not wait on the member's worker,
which unparks only when the group's consumer pulls. Returns false when the
key was not attached.

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`Promise<boolean>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.