> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ValidationError

> The request contained invalid arguments or a failed precondition.

Maps from gRPC `INVALID_ARGUMENT` and `FAILED_PRECONDITION`.

```typescript
class ValidationError extends IMessageError
```

## Constructor

```typescript
ValidationError(message: string, options: IMessageErrorOptions): ValidationError
```

### Parameters

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"options"} type={"IMessageErrorOptions"} required />

### Returns

<code>[ValidationError](/docs/reference/stable/advanced-imessage/grpc/classes/ValidationError)</code>

## Properties

<ResponseField name={"cause"} type={"unknown"} />

<ResponseField name={"code"} type={"ErrorCode"} typeHref={"/reference/stable/advanced-imessage/grpc/types/ErrorCode"} required />

<ResponseField name={"context"} type={"Record<string, string>"} required />

<ResponseField name={"grpcCode"} type={"number"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"name"} type={"string"} required />

<ResponseField name={"requestId"} type={"string"} />

<ResponseField name={"retryable"} type={"boolean"} required />

<ResponseField name={"retryAfter"} type={"number"} />

<ResponseField name={"source"} type={"string"} />

<ResponseField name={"stack"} type={"string"} />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.