> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# TypedEventStream

> TypedEventStream — the core streaming primitive for the SDK.

Wraps an async iterable source (typically from a gRPC server-streaming RPC)
and exposes multiple consumption patterns: `for await`, `.on()`, `.filter()`,
`.map()`, `.take()`, and `Symbol.asyncDispose`.

Only one consumer is allowed per stream instance. Calling `.on()` or
iterating a stream that is already being consumed throws an error.
Use `.filter()` / `.map()` / `.take()` to derive new streams before
consuming them.

```typescript
class TypedEventStream implements AsyncIterable<T>, AsyncDisposable
```

## Constructor

```typescript
TypedEventStream(source: AsyncIterable<T>, cleanup?: () => Promise<void>): TypedEventStream<T>
```

### Parameters

<ResponseField name={"source"} type={"AsyncIterable<T>"} required />

<ResponseField name={"cleanup"} type={"() => Promise<void>"} />

### Returns

<code>[TypedEventStream](/docs/reference/stable/whatsapp-business/classes/TypedEventStream){"<T>"}</code>

## Methods

### [asyncDispose]()

```typescript
[asyncDispose](): Promise<void>
```

#### Returns

`Promise<void>`

### [asyncIterator]()

```typescript
[asyncIterator](): AsyncIterator<T>
```

#### Returns

`AsyncIterator<T>`

### close()

```typescript
close(): Promise<void>
```

#### Returns

`Promise<void>`

### filter()

```typescript
filter(predicate: (event: T) => event): TypedEventStream<S>
```

#### Parameters

<ResponseField name={"predicate"} type={"(event: T) => event"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/whatsapp-business/classes/TypedEventStream){"<S>"}</code>

```typescript
filter(predicate: (event: T) => boolean): TypedEventStream<T>
```

#### Parameters

<ResponseField name={"predicate"} type={"(event: T) => boolean"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/whatsapp-business/classes/TypedEventStream){"<T>"}</code>

### map()

```typescript
map(transform: (event: T) => U): TypedEventStream<U>
```

#### Parameters

<ResponseField name={"transform"} type={"(event: T) => U"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/whatsapp-business/classes/TypedEventStream){"<U>"}</code>

### on()

```typescript
on(callback: (event: T) => void | Promise<void>): () => void
```

Subscribe to events with a callback. Returns an unsubscribe function that
stops the internal consumption loop.

The callback may be synchronous or async. If async, back-pressure is
applied — the next event is not delivered until the previous callback
resolves.

#### Parameters

<ResponseField name={"callback"} type={"(event: T) => void | Promise<void>"} required />

#### Returns

`() => void`

### take()

```typescript
take(count: number): TypedEventStream<T>
```

#### Parameters

<ResponseField name={"count"} type={"number"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/whatsapp-business/classes/TypedEventStream){"<T>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.