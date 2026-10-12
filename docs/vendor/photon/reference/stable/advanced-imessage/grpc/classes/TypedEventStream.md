> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# TypedEventStream

> Core streaming primitive used by every server-streaming SDK method.

Wraps an async iterable source (typically from a gRPC server-streaming RPC)
Exposes `for await`, `.on()`, `.filter()`, `.map()`, `.take()`, `.close()`,
and `Symbol.asyncDispose`.

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

<code>[TypedEventStream](/docs/reference/stable/advanced-imessage/grpc/classes/TypedEventStream){"<T>"}</code>

## Methods

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

Signal the stream is done. Interrupts any pending iteration.

#### Returns

`Promise<void>`

### filter()

```typescript
filter(predicate: (event: T) => event): TypedEventStream<S>
```

Create a filtered sub-stream. When the predicate is a type-guard the
returned stream is narrowed to the guard type.

#### Parameters

<ResponseField name={"predicate"} type={"(event: T) => event"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/advanced-imessage/grpc/classes/TypedEventStream){"<S>"}</code>

```typescript
filter(predicate: (event: T) => boolean): TypedEventStream<T>
```

Create a filtered sub-stream. When the predicate is a type-guard the
returned stream is narrowed to the guard type.

#### Parameters

<ResponseField name={"predicate"} type={"(event: T) => boolean"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/advanced-imessage/grpc/classes/TypedEventStream){"<T>"}</code>

### map()

```typescript
map(transform: (event: T) => U): TypedEventStream<U>
```

Transform each event into a different shape.

#### Parameters

<ResponseField name={"transform"} type={"(event: T) => U"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/advanced-imessage/grpc/classes/TypedEventStream){"<U>"}</code>

### on()

```typescript
on(callback: (event: T) => void | Promise<void>, onError?: (error: unknown) => void): () => void
```

Subscribe to events with a callback. Returns an unsubscribe function that
stops the internal consumption loop.

The callback may be synchronous or async. If async, back-pressure is
applied -- the next event is not delivered until the previous callback
resolves. Pass `onError` to handle callback or source errors; otherwise
errors are rethrown on the next microtask.

#### Parameters

<ResponseField name={"callback"} type={"(event: T) => void | Promise<void>"} required />

<ResponseField name={"onError"} type={"(error: unknown) => void"} />

#### Returns

`() => void`

### take()

```typescript
take(count: number): TypedEventStream<T>
```

Yield the first `count` events, then close the parent stream.

`count <= 0` returns an empty stream without consuming the parent.

#### Parameters

<ResponseField name={"count"} type={"number"} required />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/advanced-imessage/grpc/classes/TypedEventStream){"<T>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.