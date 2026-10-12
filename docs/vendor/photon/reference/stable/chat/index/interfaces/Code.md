> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Code

> Markdown code (flow) (block).

```typescript
interface Code extends Literal
```

## Properties

<ResponseField name={"data"} type={"CodeData"}>
  Data associated with the mdast code (flow).
</ResponseField>

<ResponseField name={"lang"} type={"string | null"}>
  Language of computer code being marked up.
</ResponseField>

<ResponseField name={"meta"} type={"string | null"}>
  Custom information relating to the node.

  If the lang field is present, a meta field can be present.
</ResponseField>

<ResponseField name={"position"} type={"Position"}>
  Position of a node in a source document.

  Nodes that are generated (not in the original source document) must not
  have a position.
</ResponseField>

<ResponseField name={"type"} type={"\"code\""} required>
  Node type of mdast code (flow).
</ResponseField>

<ResponseField name={"value"} type={"string"} required>
  Plain-text value.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.