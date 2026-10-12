> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# StreamingPlan

> A StreamingPlan wraps an async iterable with platform-specific streaming options.

Use this when you need to pass options like task grouping or stop blocks
to the streaming API. For simple streaming without options, pass the
async iterable directly to `thread.post()`.

```typescript
const stream = new StreamingPlan(result.fullStream, {
  groupTasks: "plan",
  endWith: [feedbackBlock],
});
await thread.post(stream);
```

```typescript
class StreamingPlan implements PostableObject<StreamingPlanData>
```

## Constructor

```typescript
StreamingPlan(stream: AsyncIterable<string | StreamChunk | StreamEvent>, options?: StreamingPlanOptions): StreamingPlan
```

### Parameters

<ResponseField name={"stream"} type={"AsyncIterable<string | StreamChunk | StreamEvent>"} required>
  **Type:** <code>{"AsyncIterable<string | "}[StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk){" | "}[StreamEvent](/docs/reference/stable/chat/index/types/StreamEvent){">"}</code>
</ResponseField>

<ResponseField name={"options"} type={"StreamingPlanOptions"} typeHref={"/reference/stable/chat/index/interfaces/StreamingPlanOptions"} />

### Returns

<code>[StreamingPlan](/docs/reference/stable/chat/index/classes/StreamingPlan)</code>

## Properties

<ResponseField name={"$$typeof"} type={"symbol"} required>
  Symbol identifying this as a postable object
</ResponseField>

<ResponseField name={"kind"} type={"\"stream\""} required>
  The kind of object - used by adapters to dispatch
</ResponseField>

<ResponseField name={"options"} type={"StreamingPlanOptions"} typeHref={"/reference/stable/chat/index/interfaces/StreamingPlanOptions"} required />

<ResponseField name={"stream"} type={"AsyncIterable<string | StreamChunk | StreamEvent>"} required>
  **Type:** <code>{"AsyncIterable<string | "}[StreamChunk](/docs/reference/stable/chat/index/types/StreamChunk){" | "}[StreamEvent](/docs/reference/stable/chat/index/types/StreamEvent){">"}</code>
</ResponseField>

## Methods

### getFallbackText()

```typescript
getFallbackText(): string
```

Get a fallback text representation for adapters that don't support this object type.
This should return a human-readable string representation.

#### Returns

`string`

### getPostData()

```typescript
getPostData(): StreamingPlanData
```

Get the data to send to the adapter

#### Returns

<code>[StreamingPlanData](/docs/reference/stable/chat/index/interfaces/StreamingPlanData)</code>

### isSupported()

```typescript
isSupported(_adapter: Adapter): boolean
```

Check if the adapter supports this object type

#### Parameters

<ResponseField name={"_adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required />

#### Returns

`boolean`

### onPosted()

```typescript
onPosted(_context: PostableObjectContext): void
```

Called after successful posting to bind the object to the thread

#### Parameters

<ResponseField name={"_context"} type={"PostableObjectContext"} typeHref={"/reference/stable/chat/index/interfaces/PostableObjectContext"} required />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.