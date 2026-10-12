> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# IMessageError

> Unified SDK Error Class

```typescript
class IMessageError extends Error
```

## Constructor

```typescript
IMessageError(code: ErrorCode, message: string, options?: ErrorOptions): IMessageError
```

### Parameters

<ResponseField name={"code"} type={"ErrorCode"} typeHref={"/reference/stable/imessage-kit/types/ErrorCode"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"options"} type={"ErrorOptions"} />

### Returns

<code>[IMessageError](/docs/reference/stable/imessage-kit/classes/IMessageError)</code>

## Properties

<ResponseField name={"cause"} type={"unknown"} />

<ResponseField name={"code"} type={"ErrorCode"} typeHref={"/reference/stable/imessage-kit/types/ErrorCode"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"name"} type={"string"} required />

<ResponseField name={"stack"} type={"string"} />

## Methods

### is()

```typescript
is(error: unknown): error
```

Type guard

#### Parameters

<ResponseField name={"error"} type={"unknown"} required />

#### Returns

`error`

### is()

```typescript
is(code: ErrorCode): boolean
```

Check if error is of specific type

#### Parameters

<ResponseField name={"code"} type={"ErrorCode"} typeHref={"/reference/stable/imessage-kit/types/ErrorCode"} required />

#### Returns

`boolean`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.