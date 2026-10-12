> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# EmojiResolver

> Emoji resolver that handles conversion between platform formats and normalized names.

## Constructor

```typescript
EmojiResolver(customMap?: Partial<Record<Emoji, EmojiFormats>>): EmojiResolver
```

### Parameters

<ResponseField name={"customMap"} type={"Partial<Record<Emoji, EmojiFormats>>"}>
  **Type:** <code>{"Partial<Record<"}[Emoji](/docs/reference/stable/chat/index/types/Emoji){", "}[EmojiFormats](/docs/reference/stable/chat/index/interfaces/EmojiFormats){">>"}</code>
</ResponseField>

### Returns

<code>[EmojiResolver](/docs/reference/stable/chat/index/classes/EmojiResolver)</code>

## Methods

### extend()

```typescript
extend(customMap: EmojiMapConfig): void
```

Add or override emoji mappings.

#### Parameters

<ResponseField name={"customMap"} type={"EmojiMapConfig"} typeHref={"/reference/stable/chat/index/types/EmojiMapConfig"} required />

### fromGChat()

```typescript
fromGChat(gchatEmoji: string): EmojiValue
```

Convert a Google Chat unicode emoji to normalized EmojiValue.
Returns an EmojiValue for the raw emoji if no mapping exists.

#### Parameters

<ResponseField name={"gchatEmoji"} type={"string"} required />

#### Returns

<code>[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>

### fromSlack()

```typescript
fromSlack(slackEmoji: string): EmojiValue
```

Convert a Slack emoji name to normalized EmojiValue.
Returns an EmojiValue for the raw emoji if no mapping exists.

#### Parameters

<ResponseField name={"slackEmoji"} type={"string"} required />

#### Returns

<code>[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>

### fromTeams()

```typescript
fromTeams(teamsReaction: string): EmojiValue
```

Convert a Teams reaction type to normalized EmojiValue.
Teams uses specific names: like, heart, laugh, surprised, sad, angry
Returns an EmojiValue for the raw reaction if no mapping exists.

#### Parameters

<ResponseField name={"teamsReaction"} type={"string"} required />

#### Returns

<code>[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>

### matches()

```typescript
matches(rawEmoji: string, normalized: string | EmojiValue): boolean
```

Check if an emoji (in any format) matches a normalized emoji name or EmojiValue.

#### Parameters

<ResponseField name={"rawEmoji"} type={"string"} required />

<ResponseField name={"normalized"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`boolean`

### toDiscord()

```typescript
toDiscord(emoji: string | EmojiValue): string
```

Convert a normalized emoji (or EmojiValue) to Discord format (unicode).
Discord uses unicode emoji, same as Google Chat.

#### Parameters

<ResponseField name={"emoji"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`string`

### toGChat()

```typescript
toGChat(emoji: string | EmojiValue): string
```

Convert a normalized emoji (or EmojiValue) to Google Chat format.
Returns the first GChat format if multiple exist.

#### Parameters

<ResponseField name={"emoji"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`string`

### toSlack()

```typescript
toSlack(emoji: string | EmojiValue): string
```

Convert a normalized emoji (or EmojiValue) to Slack format.
Returns the first Slack format if multiple exist.

#### Parameters

<ResponseField name={"emoji"} type={"string | EmojiValue"} required>
  **Type:** <code>{"string | "}[EmojiValue](/docs/reference/stable/chat/index/interfaces/EmojiValue)</code>
</ResponseField>

#### Returns

`string`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.