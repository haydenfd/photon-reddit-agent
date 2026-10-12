> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# StateAdapter

## Methods

### acquireLock()

```typescript
acquireLock(threadId: string, ttlMs: number): Promise<Lock | null>
```

Acquire a lock on a thread (returns null if already locked)

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"ttlMs"} type={"number"} required />

#### Returns

<code>{"Promise<"}[Lock](/docs/reference/stable/chat/index/interfaces/Lock){" | null>"}</code>

### appendToList()

```typescript
appendToList(key: string, value: unknown, options?: { maxLength: number; ttlMs: number }): Promise<void>
```

Atomically append a value to a list. Trims to maxLength (keeping newest). Refreshes TTL.

#### Parameters

<ResponseField name={"key"} type={"string"} required />

<ResponseField name={"value"} type={"unknown"} required />

<ResponseField name={"options"} type={"{ maxLength: number; ttlMs: number }"} />

#### Returns

`Promise<void>`

### connect()

```typescript
connect(): Promise<void>
```

Connect to the state backend

#### Returns

`Promise<void>`

### delete()

```typescript
delete(key: string): Promise<void>
```

Delete a cached value

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`Promise<void>`

### dequeue()

```typescript
dequeue(threadId: string): Promise<QueueEntry | null>
```

Pop the next message from the thread's queue. Returns null if empty.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

<code>{"Promise<"}[QueueEntry](/docs/reference/stable/chat/index/interfaces/QueueEntry){" | null>"}</code>

### disconnect()

```typescript
disconnect(): Promise<void>
```

Disconnect from the state backend

#### Returns

`Promise<void>`

### enqueue()

```typescript
enqueue(threadId: string, entry: QueueEntry, maxSize: number): Promise<number>
```

Atomically append a message to the thread's pending queue. Returns new queue depth.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"entry"} type={"QueueEntry"} typeHref={"/reference/stable/chat/index/interfaces/QueueEntry"} required />

<ResponseField name={"maxSize"} type={"number"} required />

#### Returns

`Promise<number>`

### extendLock()

```typescript
extendLock(lock: Lock, ttlMs: number): Promise<boolean>
```

Extend a held lock's TTL. Implementations must compare the lock token
and only extend a lock that is still held with that token — never create
or resurrect one. Returns false when the lock is no longer held with
this token (expired, released, or taken over).

#### Parameters

<ResponseField name={"lock"} type={"Lock"} typeHref={"/reference/stable/chat/index/interfaces/Lock"} required />

<ResponseField name={"ttlMs"} type={"number"} required />

#### Returns

`Promise<boolean>`

### forceReleaseLock()

```typescript
forceReleaseLock(threadId: string): Promise<void>
```

Force-release a lock on a thread, regardless of ownership token.
The previous lock holder's handler continues running — only the lock is released.
The old handler's `releaseLock()` becomes a no-op (token mismatch).

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<void>`

### get()

```typescript
get(key: string): Promise<T | null>
```

Get a cached value by key

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`Promise<T | null>`

### getList()

```typescript
getList(key: string): Promise<T[]>
```

Read all values from a list in insertion order. Returns empty array if key does not exist.

#### Parameters

<ResponseField name={"key"} type={"string"} required />

#### Returns

`Promise<T[]>`

### isSubscribed()

```typescript
isSubscribed(threadId: string): Promise<boolean>
```

Check if subscribed to a thread

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<boolean>`

### queueDepth()

```typescript
queueDepth(threadId: string): Promise<number>
```

Get the current queue depth for a thread.

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<number>`

### releaseLock()

```typescript
releaseLock(lock: Lock): Promise<void>
```

Release a lock

#### Parameters

<ResponseField name={"lock"} type={"Lock"} typeHref={"/reference/stable/chat/index/interfaces/Lock"} required />

#### Returns

`Promise<void>`

### set()

```typescript
set(key: string, value: T, ttlMs?: number): Promise<void>
```

Set a cached value with optional TTL in milliseconds

#### Parameters

<ResponseField name={"key"} type={"string"} required />

<ResponseField name={"value"} type={"T"} required />

<ResponseField name={"ttlMs"} type={"number"} />

#### Returns

`Promise<void>`

### setIfNotExists()

```typescript
setIfNotExists(key: string, value: unknown, ttlMs?: number): Promise<boolean>
```

Atomically set a value only if the key does not already exist. Returns true if set, false if key existed.

#### Parameters

<ResponseField name={"key"} type={"string"} required />

<ResponseField name={"value"} type={"unknown"} required />

<ResponseField name={"ttlMs"} type={"number"} />

#### Returns

`Promise<boolean>`

### subscribe()

```typescript
subscribe(threadId: string): Promise<void>
```

Subscribe to a thread (persists across restarts)

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<void>`

### unsubscribe()

```typescript
unsubscribe(threadId: string): Promise<void>
```

Unsubscribe from a thread

#### Parameters

<ResponseField name={"threadId"} type={"string"} required />

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.