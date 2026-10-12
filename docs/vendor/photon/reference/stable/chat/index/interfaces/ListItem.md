> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ListItem

> Markdown list item.

```typescript
interface ListItem extends Parent
```

## Properties

<ResponseField name={"checked"} type={"boolean | null"}>
  Whether the item is a tasklist item (when `boolean`).

  When `true`, the item is complete.
  When `false`, the item is incomplete.
</ResponseField>

<ResponseField name={"children"} type={"BlockContent | DefinitionContent[]"} required>
  Children of list item.
</ResponseField>

<ResponseField name={"data"} type={"ListItemData"}>
  Data associated with the mdast list item.
</ResponseField>

<ResponseField name={"position"} type={"Position"}>
  Position of a node in a source document.

  Nodes that are generated (not in the original source document) must not
  have a position.
</ResponseField>

<ResponseField name={"spread"} type={"boolean | null"}>
  Whether one or more of the children are separated with a blank line from
  its siblings (when `true`), or not (when `false` or not present).
</ResponseField>

<ResponseField name={"type"} type={"\"listItem\""} required>
  Node type of mdast list item.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.