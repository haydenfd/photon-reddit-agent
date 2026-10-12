> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# BaseFormatConverter

> Base class for format converters with default implementations.

```typescript
class BaseFormatConverter implements FormatConverter
```

## Constructor

```typescript
BaseFormatConverter(): BaseFormatConverter
```

### Returns

<code>[BaseFormatConverter](/docs/reference/stable/chat/index/classes/BaseFormatConverter)</code>

## Methods

### cardChildToFallbackText()

```typescript
cardChildToFallbackText(child: CardChild): string | null
```

Convert card child element to fallback text.

#### Parameters

<ResponseField name={"child"} type={"CardChild"} typeHref={"/reference/stable/chat/index/types/CardChild"} required />

#### Returns

`string | null`

### cardToFallbackText()

```typescript
cardToFallbackText(card: CardElement): string
```

Generate fallback text from a card element.
Override in subclasses for platform-specific formatting.

#### Parameters

<ResponseField name={"card"} type={"CardElement"} typeHref={"/reference/stable/chat/index/interfaces/CardElement"} required />

#### Returns

`string`

### defaultNodeToText()

```typescript
defaultNodeToText(node: RootContent, nodeConverter: (node: RootContent) => string): string
```

Default fallback for converting an unknown mdast node to text.
Recursively converts children if present, otherwise extracts the node value.
Adapters should call this in their nodeToX() default case.

#### Parameters

<ResponseField name={"node"} type={"RootContent"} required />

<ResponseField name={"nodeConverter"} type={"(node: RootContent) => string"} required />

#### Returns

`string`

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

### fromAstWithNodeConverter()

```typescript
fromAstWithNodeConverter(ast: Root, nodeConverter: (node: RootContent) => string): string
```

Template method for implementing fromAst with a node converter.
Iterates through AST children and converts each using the provided function.
Joins results with double newlines (standard paragraph separation).

#### Parameters

<ResponseField name={"ast"} type={"Root"} typeHref={"/reference/stable/chat/index/interfaces/Root"} required>
  The AST to convert
</ResponseField>

<ResponseField name={"nodeConverter"} type={"(node: RootContent) => string"} required>
  Function to convert each Content node to string
</ResponseField>

#### Returns

`string`

Platform-formatted string

### fromMarkdown()

```typescript
fromMarkdown(markdown: string): string
```

#### Parameters

<ResponseField name={"markdown"} type={"string"} required />

#### Returns

`string`

### renderList()

```typescript
renderList(node: List, depth: number, nodeConverter: (node: RootContent) => string, unorderedBullet?: string): string
```

#### Parameters

<ResponseField name={"node"} type={"List"} typeHref={"/reference/stable/chat/index/interfaces/List"} required />

<ResponseField name={"depth"} type={"number"} required />

<ResponseField name={"nodeConverter"} type={"(node: RootContent) => string"} required />

<ResponseField name={"unorderedBullet"} type={"string"} />

#### Returns

`string`

### renderPostable()

```typescript
renderPostable(message: AdapterPostableMessage): string
```

Convert a PostableMessage to platform format (text only).

* string: passed through as raw text (no conversion)
* \{ raw: string }: passed through as raw text (no conversion)
* \{ markdown: string }: converted from markdown to platform format
* \{ ast: Root }: converted from AST to platform format
* \{ card: CardElement }: returns fallback text (cards should be handled by adapter)
* CardElement: returns fallback text (cards should be handled by adapter)

Note: For cards, adapters should check for card content first and render
them using platform-specific card APIs, using this method only for fallback.

#### Parameters

<ResponseField name={"message"} type={"AdapterPostableMessage"} typeHref={"/reference/stable/chat/index/types/AdapterPostableMessage"} required />

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