> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# TypedEventEmitter

## Methods

### addListener()

```typescript
addListener(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

```typescript
addListener(event: string | symbol, listener: (args: unknown[]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"string | symbol"} required />

<ResponseField name={"listener"} type={"(args: unknown[]) => void"} required />

#### Returns

`this`

### emit()

```typescript
emit(event: K, args: PhotonEventMap[K] extends undefined ? [] : [PhotonEventMap[K]]): boolean
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"args"} type={"PhotonEventMap[K] extends undefined ? [] : [PhotonEventMap[K]]"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? [] : ["}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]]"}</code>
</ResponseField>

#### Returns

`boolean`

```typescript
emit(event: string | symbol, args: unknown[]): boolean
```

#### Parameters

<ResponseField name={"event"} type={"string | symbol"} required />

<ResponseField name={"args"} type={"unknown[]"} required />

#### Returns

`boolean`

### off()

```typescript
off(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

```typescript
off(event: string | symbol, listener: (args: unknown[]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"string | symbol"} required />

<ResponseField name={"listener"} type={"(args: unknown[]) => void"} required />

#### Returns

`this`

### on()

```typescript
on(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

```typescript
on(event: string | symbol, listener: (args: unknown[]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"string | symbol"} required />

<ResponseField name={"listener"} type={"(args: unknown[]) => void"} required />

#### Returns

`this`

### once()

```typescript
once(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

```typescript
once(event: string | symbol, listener: (args: unknown[]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"string | symbol"} required />

<ResponseField name={"listener"} type={"(args: unknown[]) => void"} required />

#### Returns

`this`

### removeListener()

```typescript
removeListener(event: K, listener: PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"K"} required />

<ResponseField name={"listener"} type={"PhotonEventMap[K] extends undefined ? () => void : (data: PhotonEventMap[K]) =>…"} required>
  **Type:** <code>[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K] extends undefined ? () => void : (data: "}[PhotonEventMap](/docs/reference/stable/advanced-imessage-kit/interfaces/PhotonEventMap){"[K]) => void"}</code>
</ResponseField>

#### Returns

`this`

```typescript
removeListener(event: string | symbol, listener: (args: unknown[]) => void): this
```

#### Parameters

<ResponseField name={"event"} type={"string | symbol"} required />

<ResponseField name={"listener"} type={"(args: unknown[]) => void"} required />

#### Returns

`this`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.