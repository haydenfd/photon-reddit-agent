> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Reminders

> Smart Reminders - Human-friendly message scheduling

## Constructor

```typescript
Reminders(sdk: IMessageSDK, events?: SchedulerEvents): Reminders
```

### Parameters

<ResponseField name={"sdk"} type={"IMessageSDK"} typeHref={"/reference/stable/imessage-kit/classes/IMessageSDK"} required />

<ResponseField name={"events"} type={"SchedulerEvents"} typeHref={"/reference/stable/imessage-kit/interfaces/SchedulerEvents"} />

### Returns

<code>[Reminders](/docs/reference/stable/imessage-kit/classes/Reminders)</code>

## Methods

### at()

```typescript
at(timeExpression: string, to: string, message: string, options?: ReminderOptions): string
```

Set a reminder for a specific time

```ts
reminders.at('5pm', '+1234567890', 'End of day review')
reminders.at('tomorrow 9am', '+1234567890', 'Morning standup')
reminders.at('friday 2pm', '+1234567890', 'Weekly sync')
```

#### Parameters

<ResponseField name={"timeExpression"} type={"string"} required />

<ResponseField name={"to"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"options"} type={"ReminderOptions"} typeHref={"/reference/stable/imessage-kit/interfaces/ReminderOptions"} />

#### Returns

`string`

### cancel()

```typescript
cancel(id: string): boolean
```

Cancel a reminder by ID

#### Parameters

<ResponseField name={"id"} type={"string"} required />

#### Returns

`boolean`

### count()

```typescript
count(): number
```

Get count of pending reminders

#### Returns

`number`

### destroy()

```typescript
destroy(): void
```

Destroy the reminder system

### exact()

```typescript
exact(date: Date, to: string, message: string, options?: ReminderOptions): string
```

Set a reminder for an exact date/time

#### Parameters

<ResponseField name={"date"} type={"Date"} required />

<ResponseField name={"to"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"options"} type={"ReminderOptions"} typeHref={"/reference/stable/imessage-kit/interfaces/ReminderOptions"} />

#### Returns

`string`

### get()

```typescript
get(id: string): Reminder | undefined
```

Get a reminder by ID

#### Parameters

<ResponseField name={"id"} type={"string"} required />

#### Returns

<code>[Reminder](/docs/reference/stable/imessage-kit/interfaces/Reminder){" | undefined"}</code>

### in()

```typescript
in(duration: string, to: string, message: string, options?: ReminderOptions): string
```

Set a reminder for X time from now

```ts
reminders.in('5 minutes', '+1234567890', 'Take a break!')
reminders.in('2 hours', '+1234567890', 'Call mom')
reminders.in('1 day', '+1234567890', 'Follow up on email')
```

#### Parameters

<ResponseField name={"duration"} type={"string"} required />

<ResponseField name={"to"} type={"string"} required />

<ResponseField name={"message"} type={"string"} required />

<ResponseField name={"options"} type={"ReminderOptions"} typeHref={"/reference/stable/imessage-kit/interfaces/ReminderOptions"} />

#### Returns

`string`

### list()

```typescript
list(): Reminder[]
```

List all pending reminders

#### Returns

<code>[Reminder](/docs/reference/stable/imessage-kit/interfaces/Reminder){"[]"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.