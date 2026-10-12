> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Plan

> A Plan represents a task list that can be posted to a thread.

Create a plan with `new Plan({ initialMessage: "..." })` and post it with `thread.post(plan)`.
After posting, use methods like `addTask()`, `updateTask()`, and `complete()` to update it.
For parallel steps, pass `autoCompletePrevious: false` to `addTask()` and use `updateTask({ id })` to update individual tasks.

```typescript
const plan = new Plan({ initialMessage: "Starting task..." });
await thread.post(plan);
await plan.addTask({ title: "Fetch data" });
await plan.updateTask("Got 42 results");
await plan.complete({ completeMessage: "Done!" });
```

```typescript
class Plan implements PostableObject<PlanModel>
```

## Constructor

```typescript
Plan(options: StartPlanOptions): Plan
```

### Parameters

<ResponseField name={"options"} type={"StartPlanOptions"} typeHref={"/reference/stable/chat/index/interfaces/StartPlanOptions"} required />

### Returns

<code>[Plan](/docs/reference/stable/chat/index/classes/Plan)</code>

## Properties

<ResponseField name={"$$typeof"} type={"symbol"} required>
  Symbol identifying this as a postable object
</ResponseField>

<ResponseField name={"currentTask"} type={"PlanTask | null"} required>
  **Type:** <code>[PlanTask](/docs/reference/stable/chat/index/interfaces/PlanTask){" | null"}</code>
</ResponseField>

<ResponseField name={"id"} type={"string"} required />

<ResponseField name={"kind"} type={"\"plan\""} required>
  The kind of object - used by adapters to dispatch
</ResponseField>

<ResponseField name={"tasks"} type={"readonly PlanTask[]"} required>
  **Type:** <code>{"readonly "}[PlanTask](/docs/reference/stable/chat/index/interfaces/PlanTask){"[]"}</code>
</ResponseField>

<ResponseField name={"threadId"} type={"string"} required />

<ResponseField name={"title"} type={"string"} required />

## Methods

### addTask()

```typescript
addTask(options: AddTaskOptions): Promise<PlanTask | null>
```

#### Parameters

<ResponseField name={"options"} type={"AddTaskOptions"} typeHref={"/reference/stable/chat/index/interfaces/AddTaskOptions"} required />

#### Returns

<code>{"Promise<"}[PlanTask](/docs/reference/stable/chat/index/interfaces/PlanTask){" | null>"}</code>

### complete()

```typescript
complete(options: CompletePlanOptions): Promise<void>
```

#### Parameters

<ResponseField name={"options"} type={"CompletePlanOptions"} typeHref={"/reference/stable/chat/index/interfaces/CompletePlanOptions"} required />

#### Returns

`Promise<void>`

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
getPostData(): PlanModel
```

Get the data to send to the adapter

#### Returns

<code>[PlanModel](/docs/reference/stable/chat/index/interfaces/PlanModel)</code>

### isSupported()

```typescript
isSupported(adapter: Adapter): boolean
```

Check if the adapter supports this object type

#### Parameters

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required />

#### Returns

`boolean`

### onPosted()

```typescript
onPosted(context: PostableObjectContext): void
```

Called after successful posting to bind the object to the thread

#### Parameters

<ResponseField name={"context"} type={"PostableObjectContext"} typeHref={"/reference/stable/chat/index/interfaces/PostableObjectContext"} required />

### reset()

```typescript
reset(options: StartPlanOptions): Promise<PlanTask | null>
```

#### Parameters

<ResponseField name={"options"} type={"StartPlanOptions"} typeHref={"/reference/stable/chat/index/interfaces/StartPlanOptions"} required />

#### Returns

<code>{"Promise<"}[PlanTask](/docs/reference/stable/chat/index/interfaces/PlanTask){" | null>"}</code>

### updateTask()

```typescript
updateTask(update?: UpdateTaskInput): Promise<PlanTask | null>
```

#### Parameters

<ResponseField name={"update"} type={"UpdateTaskInput"} typeHref={"/reference/stable/chat/index/types/UpdateTaskInput"} />

#### Returns

<code>{"Promise<"}[PlanTask](/docs/reference/stable/chat/index/interfaces/PlanTask){" | null>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.