> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# EmojiValue

> Immutable emoji value object with object identity.

These objects are singletons - the same emoji name always returns
the same frozen object instance, enabling `===` comparison.

```typescript
// Object identity comparison works
if (event.emoji === emoji.thumbs_up) {
  console.log("User gave a thumbs up!");
}

// Works in template strings via toString()
await thread.post(`${emoji.thumbs_up} Great job!`);
```

## Properties

<ResponseField name={"name"} type={"string"} required>
  The normalized emoji name (e.g., "thumbs\_up")
</ResponseField>

## Methods

### toJSON()

```typescript
toJSON(): string
```

Returns the placeholder string (for JSON.stringify)

#### Returns

`string`

### toString()

```typescript
toString(): string
```

Returns the placeholder string for message formatting

#### Returns

`string`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.