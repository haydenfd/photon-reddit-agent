> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MarkdownConverter

```typescript
interface MarkdownConverter extends FormatConverter
```

## Methods

### extractPlainText()

```typescript
extractPlainText(platformText: string): string
```

Extract plain text from platform format.
Convenience method - default implementation uses toAst + toPlainText.

#### Parameters

<ResponseField name={"platformText"} type={"string"} required />

#### Returns

`string`

### fromAst()

```typescript
fromAst(ast: Root): string
```

Render an AST to the platform's native format.
This is the primary method used when sending messages.

#### Parameters

<ResponseField name={"ast"} type={"Root"} typeHref={"/reference/stable/chat/index/interfaces/Root"} required />

#### Returns

`string`

### fromMarkdown()

```typescript
fromMarkdown(markdown: string): string
```

#### Parameters

<ResponseField name={"markdown"} type={"string"} required />

#### Returns

`string`

### toAst()

```typescript
toAst(platformText: string): Root
```

Parse platform's native format into an AST.
This is the primary method used when receiving messages.

#### Parameters

<ResponseField name={"platformText"} type={"string"} required />

#### Returns

<code>[Root](/docs/reference/stable/chat/index/interfaces/Root)</code>

### toMarkdown()

```typescript
toMarkdown(platformText: string): string
```

#### Parameters

<ResponseField name={"platformText"} type={"string"} required />

#### Returns

`string`

### toPlainText()

```typescript
toPlainText(platformText: string): string
```

#### Parameters

<ResponseField name={"platformText"} type={"string"} required />

#### Returns

`string`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.