> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageScheduler

> Message Scheduler Schedules messages for future delivery using the IMessageSDK

Message Scheduler

Schedules messages for future delivery using the IMessageSDK

## Constructor

```typescript
MessageScheduler(sdk: IMessageSDK, config?: SchedulerConfig, events?: SchedulerEvents): MessageScheduler
```

### Parameters

<ResponseField name={"sdk"} type={"IMessageSDK"} typeHref={"/reference/stable/imessage-kit/classes/IMessageSDK"} required />

<ResponseField name={"config"} type={"SchedulerConfig"} typeHref={"/reference/stable/imessage-kit/interfaces/SchedulerConfig"} />

<ResponseField name={"events"} type={"SchedulerEvents"} typeHref={"/reference/stable/imessage-kit/interfaces/SchedulerEvents"} />

### Returns

<code>[MessageScheduler](/docs/reference/stable/imessage-kit/classes/MessageScheduler)</code>

## Methods

### cancel()

```typescript
cancel(id: string): boolean
```

Cancel a scheduled message

#### Parameters

<ResponseField name={"id"} type={"string"} required />

#### Returns

`boolean`

true if cancelled, false if not found

### destroy()

```typescript
destroy(): void
```

Destroy the scheduler and clean up resources

### export()

```typescript
export(): { recurring: RecurringMessage[]; scheduled: ScheduledMessage[] }
```

Export all scheduled messages (for persistence)

#### Returns

<code>{"{ recurring: "}[RecurringMessage](/docs/reference/stable/imessage-kit/interfaces/RecurringMessage){"[]; scheduled: "}[ScheduledMessage](/docs/reference/stable/imessage-kit/interfaces/ScheduledMessage){"[] }"}</code>

### get()

```typescript
get(id: string): ScheduledMessage | RecurringMessage | undefined
```

Get a scheduled message by ID

#### Parameters

<ResponseField name={"id"} type={"string"} required />

#### Returns

<code>[ScheduledMessage](/docs/reference/stable/imessage-kit/interfaces/ScheduledMessage){" | "}[RecurringMessage](/docs/reference/stable/imessage-kit/interfaces/RecurringMessage){" | undefined"}</code>

### getPending()

```typescript
getPending(): ScheduledMessage | RecurringMessage[]
```

Get all pending scheduled messages

#### Returns

<code>[ScheduledMessage](/docs/reference/stable/imessage-kit/interfaces/ScheduledMessage){" | "}[RecurringMessage](/docs/reference/stable/imessage-kit/interfaces/RecurringMessage){"[]"}</code>

### import()

```typescript
import(data: { recurring: RecurringMessage[]; scheduled: ScheduledMessage[] }): { imported: number; skipped: number }
```

Import scheduled messages (for persistence)
Only imports pending messages with future send times

#### Parameters

<ResponseField name={"data"} type={"{ recurring: RecurringMessage[]; scheduled: ScheduledMessage[] }"} required>
  **Type:** <code>{"{ recurring: "}[RecurringMessage](/docs/reference/stable/imessage-kit/interfaces/RecurringMessage){"[]; scheduled: "}[ScheduledMessage](/docs/reference/stable/imessage-kit/interfaces/ScheduledMessage){"[] }"}</code>
</ResponseField>

#### Returns

`{ imported: number; skipped: number }`

### reschedule()

```typescript
reschedule(id: string, newSendAt: Date): boolean
```

Reschedule a pending message

#### Parameters

<ResponseField name={"id"} type={"string"} required />

<ResponseField name={"newSendAt"} type={"Date"} required />

#### Returns

`boolean`

true if rescheduled, false if not found or not pending

### schedule()

```typescript
schedule(options: ScheduleOptions): string
```

Schedule a one-time message

#### Parameters

<ResponseField name={"options"} type={"ScheduleOptions"} typeHref={"/reference/stable/imessage-kit/interfaces/ScheduleOptions"} required />

#### Returns

`string`

The scheduled message ID

### scheduleRecurring()

```typescript
scheduleRecurring(options: RecurringScheduleOptions): string
```

Schedule a recurring message

#### Parameters

<ResponseField name={"options"} type={"RecurringScheduleOptions"} typeHref={"/reference/stable/imessage-kit/interfaces/RecurringScheduleOptions"} required />

#### Returns

`string`

The recurring message ID


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.