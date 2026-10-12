> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Store

> A small per-platform key-value bag, modeled after Swift's .

A small per-platform key-value bag, modeled after Swift's `UserDefaults`.
Untyped writes; typed reads return `undefined` on missing key OR type
mismatch (no throws). In-memory only.

SDK-internal: reachable from inside `definePlatform` callbacks via the
`store` field on lifecycle/action/event ctx. Not exposed on the public
SpectrumInstance or platform narrower.

## Methods

### array()

```typescript
array(key: string): T[] | undefined
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`T[] | undefined`

### bool()

```typescript
bool(key: string): boolean | undefined
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`boolean | undefined`

### clear()

```typescript
clear(): void
```

### delete()

```typescript
delete(key: string): boolean
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`boolean`

### get()

```typescript
get(key: string): unknown
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`unknown`

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

#### Returns

`string[]`

### number()

```typescript
number(key: string): number | undefined
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`number | undefined`

### object()

```typescript
object(key: string): T | undefined
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`T | undefined`

### set()

```typescript
set(key: string, value: unknown): void
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

<ResponseField name={"value"} type={"unknown"} required />

### string()

```typescript
string(key: string): string | undefined
```

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`string | undefined`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.