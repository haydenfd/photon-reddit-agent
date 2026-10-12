> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# List

> Markdown list.

```typescript
interface List extends Parent
```

## Properties

<ResponseField name={"children"} type={"ListItem[]"} required>
  **Type:** <code>[ListItem](/docs/reference/stable/chat/index/interfaces/ListItem){"[]"}</code>

  Children of list.
</ResponseField>

<ResponseField name={"data"} type={"ListData"}>
  Data associated with the mdast list.
</ResponseField>

<ResponseField name={"ordered"} type={"boolean | null"}>
  Whether the items have been intentionally ordered (when `true`), or that
  the order of items is not important (when `false` or not present).
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

<ResponseField name={"start"} type={"number | null"}>
  The starting number of the list, when the `ordered` field is `true`.
</ResponseField>

<ResponseField name={"type"} type={"\"list\""} required>
  Node type of mdast list.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.